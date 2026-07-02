package com.ins.ins_classes_be.dto.response;

import com.ins.ins_classes_be.enumeration.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;

    private UserType type;

    private String avatar;

    private String name;

    private String email;

    private String createdAt;

    private String updatedAt;
}
