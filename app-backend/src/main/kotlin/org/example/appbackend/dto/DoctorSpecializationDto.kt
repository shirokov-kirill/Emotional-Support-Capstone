package org.example.appbackend.dto

data class DoctorSpecializationDto(
    val id: Int?,
    val specialization: String?,
    val description: String?,
    val doctorId: Int?
)
