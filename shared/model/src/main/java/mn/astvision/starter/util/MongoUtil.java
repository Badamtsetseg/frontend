package mn.astvision.starter.util;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class MongoUtil {

    @Autowired
    private MongoTemplate template;

    public AggregationOptions getAggregationOptions() {
        return new AggregationOptions.Builder().allowDiskUse(true).collation(Collation.of("mn")).build();
    }

    public Aggregation getAggregation(Class<?> sourceClazz, List<AggregationOperation> aggs) {
        return Aggregation.newAggregation(sourceClazz, aggs).withOptions(getAggregationOptions());
    }

    public Aggregation getAggregation(Class<?> sourceClazz, AggregationOperation... aggs) {
        return Aggregation.newAggregation(sourceClazz, aggs).withOptions(getAggregationOptions());
    }

    public <T> List<T> getMappedResults(Class<?> sourceClazz, Class<T> targetClazz, String collectionName, List<AggregationOperation> aggs) {
        return template.aggregate(getAggregation(sourceClazz, aggs), collectionName, targetClazz).getMappedResults();
    }

    public <T> List<T> getMappedResults(Class<?> sourceClazz, Class<T> targetClazz, String collectionName, AggregationOperation... aggs) {
        return template.aggregate(getAggregation(sourceClazz, aggs), collectionName, targetClazz).getMappedResults();
    }

    public <T> Document getRawResults(Class<?> sourceClazz, Class<T> targetClazz, String collectionName, List<AggregationOperation> aggs) {
        return template.aggregate(getAggregation(sourceClazz, aggs), collectionName, targetClazz).getRawResults();
    }

    public <T> Document getRawResults(Class<?> sourceClazz, Class<T> targetClazz, String collectionName, AggregationOperation... aggs) {
        return template.aggregate(getAggregation(sourceClazz, aggs), collectionName, targetClazz).getRawResults();
    }

    public DateOperators.DateToString formatDate(String field, String format) {
        return DateOperators.dateOf(field)
                .withTimezone(DateOperators.Timezone.valueOf("Asia/Ulaanbaatar")).toString(format);
    }

    /*
        string - 2
        objectId - 7;
        double - 1;
        bool - 8;
        date - 9;
        int - 16;
        long - 18;
        decimal - 19;
     */
    public AggregationOperation convertAndAdd(String convertId, String id, int type) {
        ConvertOperators.Convert convert = ConvertOperators.Convert.convertValue("$" + id);
        return addFields(convertId, convert.to(type));
    }

    public ConvertOperators.Convert convert(String value, int type) {
        ConvertOperators.Convert convert = ConvertOperators.Convert.convertValue(value);
        return convert.to(type);
    }

    public AddFieldsOperation addFields(String field, AggregationExpression value) {
        return AddFieldsOperation.addField(field).withValue(value).build();
    }

    public AddFieldsOperation addFields(String field, String value) {
        return AddFieldsOperation.addField(field).withValue(value).build();
    }

    public StringOperators.Concat concat(String value) {
        return StringOperators.Concat.valueOf(value);
    }

    public StringOperators.Concat concat(AggregationExpression value) {
        return StringOperators.Concat.valueOf(value);
    }

    public StringOperators.Substr substr(String field, int start, int end) {
        StringOperators.Substr substr = StringOperators.Substr.valueOf(field);
        return substr.substring(start, end);
    }

    public StringOperators.Substr substr(AggregationExpression value, int start, int end) {
        StringOperators.Substr substr = StringOperators.Substr.valueOf(value);
        return substr.substring(start, end);
    }

    public ArithmeticOperators.Multiply multiply(AggregationExpression value, Number num) {
        ArithmeticOperators.Multiply multiply = ArithmeticOperators.Multiply.valueOf(value);
        return multiply.multiplyBy(num);
    }

    public ArithmeticOperators.Multiply multiply(String field, Number num) {
        ArithmeticOperators.Multiply multiply = ArithmeticOperators.Multiply.valueOf(field);
        return multiply.multiplyBy(num);
    }

    public ArithmeticOperators.Divide divide(String field, String divideByField) {
        ArithmeticOperators.Divide divide = ArithmeticOperators.Divide.valueOf(field);
        return divide.divideBy(divideByField);
    }

    public ConditionalOperators.IfNull ifNull(String ref, String then) {
        return ConditionalOperators.IfNull.ifNull(ref).then(then);
    }

    public ArrayOperators.ArrayElemAt arrayElemAt(String field, int index) {
        return ArrayOperators.ArrayElemAt.arrayOf(field).elementAt(index);
    }

    public ConditionalOperators.Cond cond(AggregationExpression exp, String then, String otherWise) {
        return ConditionalOperators.Cond.newBuilder().when(exp).then(then).otherwise(otherWise);
    }

    public ConditionalOperators.Cond cond(AggregationExpression exp, String then, AggregationExpression otherWise) {
        return ConditionalOperators.Cond.newBuilder().when(exp).then(then).otherwise(otherWise);
    }

    public ComparisonOperators.Eq eq(String field, String value) {
        return ComparisonOperators.Eq.valueOf(field).equalToValue(value);
    }

    public void queryRegex(Query query, String value, String key) {
        if (!StringUtils.isEmpty(value))
            query.addCriteria(where(key).regex(value, "i"));
    }

    public void queryIs(Query query, Object value, String key) {
        if (!ObjectUtils.isEmpty(value))
            query.addCriteria(where(key).is(value));
    }

    public void queryIn(Query query, List<?> value, String key) {
        if (value != null && !value.isEmpty())
            query.addCriteria(where(key).in(value));
    }

    public void localDateBetween(Query query, LocalDate startDate, LocalDate endDate, String key) {
        if (startDate != null && endDate != null) {
            queryAndCriteria(query, where(key).gt(startDate), where(key).lte(endDate));
        }
    }

    public Criteria orCriteriaRegex(String value, String key1, String key2) {
        return !StringUtils.isEmpty(value)
                ? new Criteria().orOperator(where(key1).regex(value, "i"), where(key2).regex(value, "i"))
                : new Criteria();
    }

    public Criteria orCriteriaIs(String value, String key1, String key2) {
        return !StringUtils.isEmpty(value)
                ? new Criteria().orOperator(where(key1).is(value), where(key2).is(value))
                : new Criteria();
    }

    public void queryAndCriteria(Query query, Criteria... criteria) {
        query.addCriteria(new Criteria().andOperator(criteria));
    }

    public void queryPageable(Query query, Pageable pageable) {
        if (pageable != null)
            query.with(pageable);
    }

    public void queryDeleted(Query query, Boolean deleted) {
        query.addCriteria(where("deleted").is(deleted != null ? deleted : false));
    }
}
