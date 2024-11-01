package org.example.appbackend.dto

data class LoginResponseDto(
        val token: String,
        val id: Int
)