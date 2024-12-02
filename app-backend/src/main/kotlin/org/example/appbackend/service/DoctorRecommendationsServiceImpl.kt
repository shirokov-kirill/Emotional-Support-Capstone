package org.example.appbackend.service

import org.example.appbackend.config.JwtTokenFilter
import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto
import org.example.appbackend.dto.UserMoodDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class DoctorRecommendationsServiceImpl(
    private val aiService: AIService,
    private val userMoodService: UserMoodService,
    private val jwtTokenFilter: JwtTokenFilter
) : DoctorRecommendationsService {

    @Value("\${recommendation.doctor}")
    private lateinit var request: String

    override fun getRecommendationsByDoctor(authToken: String, userId: Int): RecommendationForDoctorDto {
        val userMoods = userMoodService.getAllowedUserMoods(authToken, userId)
        val message = constructRequestToAi(userMoods)
        val answer = aiService.sendRequestToAI(message)
        val doctorId = jwtTokenFilter.extractUserId(authToken.substring(7))
        return RecommendationForDoctorDto(doctorId, userId, answer)
    }

    private fun constructRequestToAi(userMoods: List<UserMoodDto>): String {
        val message = StringBuilder(request)

        userMoods.forEach {
            message.append("date: ${it.created}, color: ${it.color}, emoji: ${it.emoji}, description: ${it.description}\n")
        }

        return message.toString()
    }
}