package org.example.appbackend.dto

import java.time.LocalDate

data class CreateUserDto(
        val username: String,
        val password: String,
        val firstName: String?,
        val lastName: String?,
        val email: String,
        val dateOfBirth: LocalDate?,
        val gender: String?,
        val securityQuestion: String?,
        val securityAnswer: String?
)