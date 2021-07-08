package mn.astvision.starter.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author MethoD
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pagination {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private int currentPage;
    private int pageSize;

    public int getCurrentPage() {
        return currentPage == 0 ? 0 : currentPage - 1;
    }

    public int getPageSize() {
        return pageSize != 0 ? pageSize : DEFAULT_PAGE_SIZE;
    }
}
