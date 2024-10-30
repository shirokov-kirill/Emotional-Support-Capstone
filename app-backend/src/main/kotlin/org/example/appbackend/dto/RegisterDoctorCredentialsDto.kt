package org.example.appbackend.dto

import java.time.LocalDate

data class RegisterDoctorCredentialsDto(
    val username: String,
    val password: String,
    val firstName: String?,
    val lastName: String?,
    val email: String?,
    val dateOfBirth: LocalDate?
)
