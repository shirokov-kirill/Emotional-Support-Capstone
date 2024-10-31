package org.example.appbackend.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class UserDto(
        val id: Int,
        val username: String,
        val firstName: String?,
        val lastName: String?,
        val email: String,
        val dateOfBirth: LocalDate?,
        val gender: String?,
        val secretQuestion: String?,
        val secretAnswer: String?,
        val createdAt: LocalDateTime?,
        val updatedAt: LocalDateTime?,
        val deletedAt: LocalDateTime?
)