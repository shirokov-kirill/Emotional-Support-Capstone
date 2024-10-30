package org.example.appbackend.dto

import java.time.LocalDateTime

data class DoctorCredentialsDto(
    val id: Int,
    val created: LocalDateTime?,
    val username: String?,
    val firstName: String?,
    val lastName: String?,
    val email: String?,
    val clinic: String?,
    val specialisation: String?,
)
