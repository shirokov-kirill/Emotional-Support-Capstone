package org.example.appbackend.mood

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.Url
import org.example.appbackend.createUser
import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.loginUser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import java.time.LocalDate

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
@ActiveProfiles("test")
class MoodTimeFrameIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    @Test
    fun `test mood retrieved`() {
        val username = "foo"
        val password = "bar"
        val user = createUser(url, restTemplate, username, password, email = "baz@qux.com")
        val userToken = loginUser(url, restTemplate, username, password)
        val emoji = "\uD83D\uDE09"
        createMood(url, restTemplate, user, userToken, emoji = emoji)
        val currentDate = LocalDate.now()

        val moods1 = getMoodsFromTimeframe(currentDate.minusDays(10), currentDate.plusDays(10), userToken)
        assertEquals(1, moods1.size)
        assertEquals(emoji, moods1.values.first().emoji)
        assertEquals(currentDate, moods1.keys.first())

        val moods2 = getMoodsFromTimeframe(currentDate.plusDays(1), currentDate.plusDays(1), userToken)
        assertEquals(moods2.size, 0)

        val moods3 = getMoodsFromTimeframe(currentDate, currentDate.plusDays(1), userToken)
        assertEquals(moods3.size, 1)
        assertEquals(emoji, moods3.values.first().emoji)
        assertEquals(currentDate, moods3.keys.first())
    }

    private fun createMood(
        url: Url,
        restTemplate: TestRestTemplate,
        userId: Int,
        userToken: String,
        color: String = "black",
        emoji: String = ":)",
        description: String = "I'm ok.",
    ): UserMoodDto {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $userToken")
        val createUserMoodDto = CreateUserMoodDto(color, emoji, description, userId)
        val requestEntity = HttpEntity<CreateUserMoodDto>(createUserMoodDto, headers)
        val response = restTemplate.postForEntity(url.createMood, requestEntity, UserMoodDto::class.java)
        assertEquals(HttpStatus.OK, response.statusCode)
        return response.body!!
    }

    private fun getMoodsFromTimeframe(startDate: LocalDate, endDate: LocalDate, userToken: String): Map<LocalDate, UserMoodDto> {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $userToken")
        val stringUrl = url.getUserMoodTimeFrame(startDate, endDate)

        val response = restTemplate.exchange(
            stringUrl,
            HttpMethod.GET,
            HttpEntity<Any>(headers),
            object : ParameterizedTypeReference<Map<LocalDate, UserMoodDto>>() {}
        )
        assertEquals(response.statusCode, HttpStatus.OK)
        return response.body ?: error("Body is null")
    }
}