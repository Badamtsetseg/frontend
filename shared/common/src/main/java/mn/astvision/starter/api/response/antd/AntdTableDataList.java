package mn.astvision.starter.api.response.antd;

import lombok.Data;
import mn.astvision.starter.api.request.antd.AntdPagination;

/**
 * @param <T>
 * @author MethoD
 */
@Data
public class AntdTableDataList<T> {

    private AntdPagination pagination;
    private Iterable<T> list;
}
