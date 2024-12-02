package org.example.appbackend.dto

data class GetLiteratureRecommendationsForDoctorDto(
    val doctorId: Int, val topic: String
)