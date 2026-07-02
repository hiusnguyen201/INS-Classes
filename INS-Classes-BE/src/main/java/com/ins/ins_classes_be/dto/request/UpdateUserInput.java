package com.ins.ins_classes_be.dto.request;

import com.ins.ins_classes_be.enumeration.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserInput {
    private String avatar;

    private String name;

    private UserType type;
}
