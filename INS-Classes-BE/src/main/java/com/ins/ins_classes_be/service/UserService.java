package com.ins.ins_classes_be.service;

import com.ins.ins_classes_be.common.BusinessException;
import com.ins.ins_classes_be.common.ExceptionError;
import com.ins.ins_classes_be.common.ListResponse;
import com.ins.ins_classes_be.dto.request.CreateUserInput;
import com.ins.ins_classes_be.dto.request.UpdateUserInput;
import com.ins.ins_classes_be.dto.response.UserDto;
import com.ins.ins_classes_be.entity.User;
import com.ins.ins_classes_be.repository.UserRepository;
import com.ins.ins_classes_be.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserDto createUser(CreateUserInput createUserInput) {
        boolean isExisted = userRepository.existsByEmail(createUserInput.getEmail());
        if (isExisted) {
            throw new BusinessException(ExceptionError.EMAIL_EXISTS);
        }

        User user = User.builder()
                .type(createUserInput.getType())
                .avatar(createUserInput.getAvatar())
                .name(createUserInput.getName())
                .email(createUserInput.getEmail())
                .password(passwordEncoder.encode(createUserInput.getPassword()))
                .build();

        User savedUser = userRepository.save(user);
        return userMapper.mapToUserDto(savedUser);
    }

    public ListResponse<UserDto> getUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return ListResponse.from(users, userMapper::mapToUserDto);
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ExceptionError.USER_NOT_FOUND));
        return userMapper.mapToUserDto(user);
    }

    public UserDto updateUserById(Long id, UpdateUserInput updateUserInput) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ExceptionError.USER_NOT_FOUND));

        if(updateUserInput.getName() != null) {
            user.setName(updateUserInput.getName());
        }

        if(updateUserInput.getAvatar() != null) {
            user.setAvatar(updateUserInput.getAvatar());
        }

        user = userRepository.save(user);
        return userMapper.mapToUserDto(user);
    }

    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ExceptionError.USER_NOT_FOUND));
        userRepository.delete(user);
    }
}
