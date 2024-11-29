package org.example.appbackend.service

import org.example.appbackend.dto.GetRecommendationForDoctorDto
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
    private lateinit var request: String

    override fun getRecommendationsByDoctor(dto: GetRecommendationForDoctorDto): RecommendationForDoctorDto {
        val userMoods = userMoodService.getAllowedUserMoods(dto.userId, dto.doctorId)
        val message = constructRequestToAi(userMoods)
        val answer = aiService.sendRequestToAI(message)
        return RecommendationForDoctorDto(dto.doctorId, dto.userId, answer)
    }

    private fun constructRequestToAi(userMoods: List<UserMoodDto>): String {
        val message = StringBuilder(request)

        userMoods.forEach {
            message.append("date: ${it.created}, color: ${it.color}, emoji: ${it.emoji}, description: ${it.description}\n")
        }

        return message.toString()
    }
}