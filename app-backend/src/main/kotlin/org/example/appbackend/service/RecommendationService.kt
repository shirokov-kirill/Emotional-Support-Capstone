package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.DoctorRecommendationDto
import org.example.appbackend.dto.UserMoodDto

interface RecommendationService {
    fun getRelevantDoctors(userMoods: List<UserMoodDto>, doctors: List<DoctorCredentialsDto>): List<DoctorRecommendationDto>
}