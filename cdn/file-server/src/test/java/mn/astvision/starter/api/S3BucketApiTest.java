package mn.astvision.starter.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.FileUploadRequest;
import mn.astvision.starter.auth.TokenUtil;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.File;
import java.nio.file.Files;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author MethoD
 */
@Ignore
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class S3BucketApiTest {

    private final String baseUrl = "/api/s3";

    @Value("${token.header}")
    private String tokenHeader;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(springSecurity()).build();
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Ignore
    @Test
    public void testCreate() throws Exception {
        log.info("Running s3 bucket api test - upload");
        FileUploadRequest fileUploadRequest = new FileUploadRequest(
                "test-image",
                "test.png",
                Files.readAllBytes(new File("D:/test-gp/wrong_1.jpg").toPath()),
                null);

        MvcResult mvcResult = mockMvc.perform(post(baseUrl + "/upload")
                .header(tokenHeader, tokenUtil.generateToken("dev", ""))
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fileUploadRequest))
        )
                .andExpect(status().is(200))
                .andExpect(jsonPath("result", is(true)))
                .andExpect(jsonPath("data", notNullValue())).andReturn();

        String rawResponse = mvcResult.getResponse().getContentAsString();
        log.info("S3 bucket api upload response: " + rawResponse);
    }
}
