package org.example.appbackend.dto

data class RecommendationForDoctorDto(
    val doctorId: Int,
    val userId: Int,
    val recommendation: String
)