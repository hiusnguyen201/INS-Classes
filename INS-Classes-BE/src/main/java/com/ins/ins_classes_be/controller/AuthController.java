package com.ins.ins_classes_be.controller;

import com.ins.ins_classes_be.common.ApiResponse;
import com.ins.ins_classes_be.dto.request.LoginInput;
import com.ins.ins_classes_be.dto.request.RefreshTokenInput;
import com.ins.ins_classes_be.dto.request.RegisterInput;
import com.ins.ins_classes_be.dto.response.AuthDto;
import com.ins.ins_classes_be.dto.response.UserDto;
import com.ins.ins_classes_be.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthDto> register(@Valid @RequestBody RegisterInput registerInput) {
        return ApiResponse.ok(authService.register(registerInput));
    }

    @PostMapping("/login")
    public ApiResponse<AuthDto> login(@Valid @RequestBody LoginInput loginInput) {
        return ApiResponse.ok(authService.login(loginInput));
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthDto> refresh(@Valid @RequestBody RefreshTokenInput refreshTokenInput) {
        return ApiResponse.ok(authService.refresh(refreshTokenInput));
    }

    @GetMapping("/me")
    public ApiResponse<UserDto> getCurrentUser() {
        return ApiResponse.ok(authService.getCurrentUser());
    }
}
