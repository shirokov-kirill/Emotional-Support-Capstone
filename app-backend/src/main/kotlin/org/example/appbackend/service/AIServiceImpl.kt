package org.example.appbackend.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.example.appbackend.exception.AIException
import org.springframework.http.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class AIServiceImpl(
    private val restTemplate: RestTemplate,
    private val objectMapper: ObjectMapper
) : AIService {

    @Value("\${openai.api.url}")
    private lateinit var apiUrl: String
    @Value("\${openai.api.key}")
    private lateinit var apiKey: String

    override fun sendRequestToAI(prompt: String): String {
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
            set("Authorization", "Bearer $apiKey")
        }

        val requestBody = mapOf(
            "model" to "gpt-3.5-turbo",
            "messages" to listOf(mapOf("role" to "user", "content" to prompt))
        )

        val jsonRequestBody = objectMapper.writeValueAsString(requestBody)

        val entity = HttpEntity(jsonRequestBody, headers)

        val response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String::class.java)

        return if (response.statusCode == HttpStatus.OK) {
            response.body ?: throw AIException("Empty reply from AI")
        } else {
            throw AIException("Error when calling the AI API: ${response.statusCode}")
        }
    }
}