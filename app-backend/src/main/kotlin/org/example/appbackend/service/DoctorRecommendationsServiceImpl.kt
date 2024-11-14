package org.example.appbackend.service

import org.example.appbackend.dto.GetLiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.LiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto
import org.example.appbackend.dto.UserMoodDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class DoctorRecommendationsServiceImpl(
    private val aiService: AIService,
    private val userMoodService: UserMoodService
) : DoctorRecommendationsService {

    @Value("\${recommendation.doctor}")
    private lateinit var recommendationRequest: String
    @Value("\${recommendation.literature}")
    private lateinit var literatureRequest: String

    override fun getRecommendationsForDoctor(dto: GetRecommendationForDoctorDto): RecommendationForDoctorDto {
        val userMoods = userMoodService.getAllowedUserMoods(dto.userId, dto.doctorId)
        val message = constructRecommendationRequestToAi(userMoods)
        val answer = aiService.sendRequestToAI(message)
        return RecommendationForDoctorDto(dto.doctorId, dto.userId, answer)
    }

    override fun getLiteratureRecommendations(dto: GetLiteratureRecommendationsForDoctorDto): LiteratureRecommendationsForDoctorDto {
        val message = literatureRequest + dto.topic
        val answer = aiService.sendRequestToAI(message)
        return LiteratureRecommendationsForDoctorDto(dto.doctorId, answer)
    }

    private fun constructRecommendationRequestToAi(userMoods: List<UserMoodDto>): String {
        val message = StringBuilder(recommendationRequest)

        userMoods.forEach {
            message.append("date: ${it.created}, color: ${it.color}, emoji: ${it.emoji}, description: ${it.description}\n")
        }

        return message.toString()
    }
}