package mn.astvision.starter.spring.filter;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import mn.astvision.starter.util.RequestIpUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * @author MethoD
 */
@Component
public class RequestThrottleFilter implements Filter {

    private static final Logger log = LoggerFactory.getLogger("throttleLogger");

    @Value("${throttle.requestPerIp}")
    private int MAX_REQUESTS_PER_SECOND = 10; //or whatever you want it to be

    private final LoadingCache<String, Integer> requestCountsPerIpAddress;

    public RequestThrottleFilter() {
        super();
        log.info("Starting request throttle filter");
        requestCountsPerIpAddress = CacheBuilder.newBuilder().expireAfterWrite(1, TimeUnit.SECONDS).build(new CacheLoader<String, Integer>() {
            @Override
            public Integer load(String key) {
                return 0;
            }
        });
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String clientIpAddress = RequestIpUtil.getClientIP(httpServletRequest);
        if (isMaximumRequestsPerSecondExceeded(clientIpAddress)) {
            log.error("Too many requests: " + clientIpAddress);
            httpServletResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpServletResponse.getWriter().write("Too many requests");
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private boolean isMaximumRequestsPerSecondExceeded(String clientIpAddress) {
        int requests;
        try {
            requests = requestCountsPerIpAddress.get(clientIpAddress);
            if (requests > MAX_REQUESTS_PER_SECOND) {
                log.warn("Max number of requests: " + clientIpAddress + " -> " + requests);
                requestCountsPerIpAddress.put(clientIpAddress, requests);
                return true;
            } else if (requests > (MAX_REQUESTS_PER_SECOND / 4 * 3)) {
                log.warn("High number of requests: " + clientIpAddress + " -> " + requests);
                return false;
            }
        } catch (ExecutionException e) {
            requests = 0;
        }
        requests++;
        requestCountsPerIpAddress.put(clientIpAddress, requests);
        return false;
    }

    @Override
    public void destroy() {
    }
}
