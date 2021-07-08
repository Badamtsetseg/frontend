package mn.astvision.starter.api.request.antd;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

/**
 * @author MethoD
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AntdPagination {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private int currentPage;
    private int pageSize;
    private long total;

    private Sort.Direction sortDirection;
    private String[] sortParams;

    public int getCurrentPage() {
        return currentPage == 0 ? 0 : currentPage - 1;
    }
    //  Ant Design table-д ашиглана
    public int getCurrent() {
        return currentPage == 0 ? 1 : currentPage;
    }

    public int getPageSize() {
        return pageSize != 0 ? pageSize : DEFAULT_PAGE_SIZE;
    }

    public Sort.Direction getSortDirection() {
        return sortDirection != null ? sortDirection : Sort.Direction.DESC;
    }

    public String[] getSortParams() {
        return sortParams != null ? sortParams : new String[] {"id"};
    }

    public PageRequest toPageRequest() {
        return PageRequest.of(getCurrentPage(), getPageSize(), getSortDirection(), getSortParams());
    }
}
