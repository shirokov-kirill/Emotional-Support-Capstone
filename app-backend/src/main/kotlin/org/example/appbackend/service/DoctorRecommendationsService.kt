package org.example.appbackend.service

import org.example.appbackend.dto.GetLiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.LiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto

interface DoctorRecommendationsService {

    fun getRecommendationsForDoctor(dto: GetRecommendationForDoctorDto) : RecommendationForDoctorDto

    fun getLiteratureRecommendations(dto: GetLiteratureRecommendationsForDoctorDto) : LiteratureRecommendationsForDoctorDto
}