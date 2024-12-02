package org.example.appbackend.service

import org.example.appbackend.dto.BreathExerciseForUserDto
import org.example.appbackend.dto.GetBreathExerciseForUserDto
import org.example.appbackend.utils.MessageSourceProvider
import org.springframework.stereotype.Service

@Service
class UserAIServiceImpl(
    private val aiService: AIService,
) : UserAIService {
    private fun parseExercises(response: String): Map<String, String> {
        val separator = MessageSourceProvider.getMessage("ai.separator")

        return response
            .split(separator)
            .map { it.trim() }
            .associate {
                val firstLine = it.lines().first().trim()

                firstLine to it.removePrefix(firstLine).trim()
            }
    }

    override fun getBreathExercise(request: GetBreathExerciseForUserDto): BreathExerciseForUserDto {
        val separator = MessageSourceProvider.getMessage("ai.separator")
        val prompt = MessageSourceProvider.getMessage("ai.prompt.get.breath.exercises", request.mood, separator)

        val response = aiService.sendRequestToAI(prompt)

        return BreathExerciseForUserDto(parseExercises(response))
    }
}
