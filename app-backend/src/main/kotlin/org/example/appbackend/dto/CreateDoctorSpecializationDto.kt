package org.example.appbackend.dto

data class CreateDoctorSpecializationDto(
    val specialization: String,
    val description: String?,
    val doctorId: Int
)
