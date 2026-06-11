package com.ins.ins_classes_be.service.mapper;

import com.ins.ins_classes_be.dto.response.UserDto;
import com.ins.ins_classes_be.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserDto mapToUserDto(User user);

    List<UserDto> mapToUserDtoList(List<User> users);
}