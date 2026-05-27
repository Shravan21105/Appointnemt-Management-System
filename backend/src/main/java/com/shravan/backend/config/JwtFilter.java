package com.shravan.backend.config;

import com.shravan.backend.security.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter
        extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(
            JwtUtil jwtUtil
    ) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader =
                request.getHeader("Authorization");

        String token = null;
        String username = null;

        // CHECK HEADER
        if (
                authHeader != null
                        &&
                        authHeader.startsWith("Bearer ")
        ) {

            token = authHeader.substring(7);

            username =
                    jwtUtil.extractUsername(token);
        }

        // SET AUTHENTICATION
        if (
                username != null
                        &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null
        ) {

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_ADMIN"
                                    )
                            )
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authToken);
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}