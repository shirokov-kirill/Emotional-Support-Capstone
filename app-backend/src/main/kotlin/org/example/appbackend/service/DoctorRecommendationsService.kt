package org.example.appbackend.service

import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto

interface DoctorRecommendationsService {

    fun getRecommendationsByDoctor(authToken: String, userId: Int) : RecommendationForDoctorDto
}