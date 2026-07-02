package com.ins.ins_classes_be.common;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.function.Function;

@Data
@Builder
public class ListResponse<T> {

    private List<T> items;
    private PageMetadata metadata;

    public static <T> ListResponse<T> of(List<T> items, PageMetadata metadata) {
        return ListResponse.<T>builder()
                .items(items)
                .metadata(metadata)
                .build();
    }

    public static <S, T> ListResponse<T> from(Page<S> page, Function<S, T> mapper) {
        return ListResponse.<T>builder()
                .items(page.getContent().stream().map(mapper).toList())
                .metadata(PageMetadata.from(page))
                .build();
    }
}