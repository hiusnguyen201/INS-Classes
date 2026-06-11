package com.ins.ins_classes_be.service;

import com.ins.ins_classes_be.common.BusinessException;
import com.ins.ins_classes_be.common.ExceptionError;
import com.ins.ins_classes_be.dto.request.LoginInput;
import com.ins.ins_classes_be.dto.request.RefreshTokenInput;
import com.ins.ins_classes_be.dto.request.RegisterInput;
import com.ins.ins_classes_be.dto.response.AuthDto;
import com.ins.ins_classes_be.dto.response.UserDto;
import com.ins.ins_classes_be.entity.User;
import com.ins.ins_classes_be.enumeration.UserType;
import com.ins.ins_classes_be.repository.UserRepository;
import com.ins.ins_classes_be.security.JwtService;
import com.ins.ins_classes_be.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthDto register(RegisterInput registerInput) {
        if (userRepository.existsByEmail(registerInput.getEmail())) {
            throw new BusinessException(ExceptionError.EMAIL_EXISTS);
        }

        User user = User.builder()
                .type(UserType.USER)
                .name(registerInput.getName())
                .email(registerInput.getEmail())
                .password(passwordEncoder.encode(registerInput.getPassword()))
                .avatar(registerInput.getAvatar())
                .build();

        // Self-registration has no authenticated user: audit createdBy/updatedBy
        // as the registrant's own email by temporarily authenticating as it.
        Authentication previousAuth = SecurityContextHolder.getContext().getAuthentication();
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(registerInput.getEmail(), null, List.of()));
        try {
            user = userRepository.save(user);
            return issueTokens(user);
        } finally {
            SecurityContextHolder.getContext().setAuthentication(previousAuth);
        }
    }

    public AuthDto login(LoginInput loginInput) {
        User user = userRepository.findByEmail(loginInput.getEmail())
                .orElseThrow(() -> new BusinessException(ExceptionError.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
            throw new BusinessException(ExceptionError.INVALID_CREDENTIALS);
        }

        return issueTokens(user);
    }

    public AuthDto refresh(RefreshTokenInput refreshTokenInput) {
        String refreshToken = refreshTokenInput.getRefreshToken();
        Long userId = jwtService.extractUserId(refreshToken);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ExceptionError.TOKEN_INVALID));

        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new BusinessException(ExceptionError.TOKEN_INVALID);
        }

        return issueTokens(user);
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof Long userId)) {
            throw new BusinessException(ExceptionError.UNAUTHORIZED);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ExceptionError.UNAUTHORIZED));

        return userMapper.mapToUserDto(user);
    }

    private AuthDto issueTokens(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        user.setRefreshToken(refreshToken);
        user = userRepository.save(user);

        return AuthDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.mapToUserDto(user))
                .build();
    }
}
