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
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserDto createUser(CreateUserInput createUserInput) {
        boolean isExisted = userRepository.existsByEmail(createUserInput.getEmail());
        if (isExisted) {
            throw new BusinessException(ExceptionError.EMAIL_EXISTS);
        }

        User user = User.builder()
                .type(createUserInput.getType().toString())
                .name(createUserInput.getName())
                .email(createUserInput.getEmail())
                .password(passwordEncoder.encode(createUserInput.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        if (Boolean.TRUE.equals(createUserInput.getIsSendPasswordViaEmail())) {
            emailService.sendUserPasswordEmail(
                    savedUser.getEmail(),
                    savedUser.getName(),
                    createUserInput.getPassword()
            );
        }

        return userMapper.mapToUserDto(savedUser);
    }

    public ListResponse<UserDto> getUsers(Pageable pageable, String keyword, String type) {
        Pageable sorted = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        Page<User> users = userRepository.findAll(buildSpec(keyword, type), sorted);
        return ListResponse.from(users, userMapper::mapToUserDto);
    }

    private Specification<User> buildSpec(String keyword, String type) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (keyword != null && !keyword.isBlank()) {
                String like = "%" + keyword.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("email")), like)
                ));
            }
            if (type != null && !type.isBlank()) {
                predicates.add(cb.equal(root.get("type"), type));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
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

        if (updateUserInput.getAvatar() != null) {
            user.setAvatar(updateUserInput.getAvatar());
        }

        if (updateUserInput.getType() != null) {
            user.setType(updateUserInput.getType().toString());
        }

        user = userRepository.save(user);
        return userMapper.mapToUserDto(user);
    }

    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ExceptionError.USER_NOT_FOUND));
        userRepository.delete(user);
    }
}
