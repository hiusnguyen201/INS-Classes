package com.ins.ins_classes_be.common;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class PageMetadata {
    private int page;
    private int size;
    private long totalCount;
    private int totalPages;
    private boolean hasNextPage;
    private boolean hasPreviousPage;

    public static PageMetadata from(Page<?> page) {
        return PageMetadata.builder()
                .page(page.getNumber() + 1)
                .size(page.getSize())
                .totalCount(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .hasNextPage(page.hasNext())
                .hasPreviousPage(page.hasPrevious())
                .build();
    }
}