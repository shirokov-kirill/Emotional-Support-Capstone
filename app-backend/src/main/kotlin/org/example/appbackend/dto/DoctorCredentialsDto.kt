package org.example.appbackend.dto

import java.time.LocalDateTime

data class DoctorCredentialsDto(
    val id: Int?,
    val created: LocalDateTime?,
    val username: String?,
    val name: String?,
    val surname: String?,
    val email: String?,
    val clinic: String?,
    val specialisation: String?,
)
