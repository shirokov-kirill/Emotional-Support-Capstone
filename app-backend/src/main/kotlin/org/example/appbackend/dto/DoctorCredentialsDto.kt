package org.example.appbackend.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class DoctorCredentialsDto(
    val id: Int,
    val created: LocalDateTime?,
    val username: String?,
    val firstName: String?,
    val lastName: String?,
    val email: String?,
    val dateOfBirth: LocalDate?,
    val clinic: String?,
    val specialisation: String?,
    val agreedForRecommendations: Boolean?,
)
