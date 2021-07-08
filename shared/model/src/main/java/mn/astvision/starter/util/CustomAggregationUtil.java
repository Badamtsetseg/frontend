package mn.astvision.starter.util;

import org.bson.Document;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperationContext;
import org.springframework.stereotype.Component;

@Component
public class CustomAggregationUtil {

    public Operation convertObjectId(String convertId, String id) {
        return buildOperation("{$addFields: {" + convertId + ": { $toObjectId: \"$" + id + "\" } } }");
    }

    public Operation convertString(String convertId, String id) {
        return buildOperation("{$addFields: {" + convertId + ": { $toString: \"$" + id + "\" } } }");
    }

    public Operation buildOperation(String jsonOperation) {
        return new Operation(jsonOperation);
    }

    private class Operation implements AggregationOperation {

        private final String jsonOperation;

        public Operation(String jsonOperation) {
            this.jsonOperation = jsonOperation;
        }

        @Override
        public Document toDocument(AggregationOperationContext aggregationOperationContext) {
            return aggregationOperationContext.getMappedObject(Document.parse(jsonOperation));
        }
    }
}
