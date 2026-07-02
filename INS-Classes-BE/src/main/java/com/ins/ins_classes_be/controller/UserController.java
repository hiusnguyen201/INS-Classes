package com.ins.ins_classes_be.controller;

import com.ins.ins_classes_be.common.ApiResponse;
import com.ins.ins_classes_be.common.ListResponse;
import com.ins.ins_classes_be.dto.request.CreateUserInput;
import com.ins.ins_classes_be.dto.request.UpdateUserInput;
import com.ins.ins_classes_be.dto.response.UserDto;
import com.ins.ins_classes_be.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ApiResponse<UserDto> createUser(@Valid @RequestBody CreateUserInput createUserInput) {
        return ApiResponse.ok(userService.createUser(createUserInput));
    }

    @GetMapping
    public ApiResponse<ListResponse<UserDto>> getUsers(
            Pageable pageable,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String type
    ) {
        return ApiResponse.ok(userService.getUsers(pageable, keyword, type));
    }

    @GetMapping("/{id}")
    public ApiResponse<UserDto> getUserById(@PathVariable Long id) {
        return ApiResponse.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ApiResponse<UserDto> updateUserById(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserInput updateUserInput
    ) {
        return ApiResponse.ok(userService.updateUserById(id, updateUserInput));
    }

    @GetMapping("/check-email")
    public ApiResponse<Boolean> checkEmailExists(@RequestParam String email) {
        return ApiResponse.ok(userService.checkEmailExists(email));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ApiResponse.ok(true);
    }
}
