package org.example.appbackend.mood

import org.example.appbackend.*
import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.ShareMoodTimeFrameWithDoctorsDto
import org.example.appbackend.dto.UserMoodDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import java.time.LocalDateTime

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class CriticalMoodIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    private val CRITICAL_NEGATIVE_MOOD_EMOJI = arrayOf(
        "\uD83D\uDE21",  // 😡
        "\uD83E\uDD2C",  // 🤬
        "\uD83E\uDD2E",  // 🤮
        "\uD83E\uDD21",  // 🤡
        "\uD83D\uDE2B",  // 😫
        "\uD83D\uDE29",  // 😩
        "\uD83D\uDE2D"   // 😭
    )

    @Test
    fun `test sharing`() {
        val username = "foo"
        val password = "bar"
        val user = createUser(url, restTemplate, username, password, email = "baz@qux.com")
        val userToken = loginUser(url, restTemplate, username, password)
        val usernameDoctor1 = "d1"
        val passwordDoctor1 = "bar"
        val doctor1 = createDoctor(url, restTemplate, usernameDoctor1, passwordDoctor1)
        val doctor1Token = loginDoctor(url, restTemplate, usernameDoctor1, passwordDoctor1)

        val usernameDoctor2 = "d2"
        val passwordDoctor2 = "bar"
        val doctor2 = createDoctor(url, restTemplate, usernameDoctor2, passwordDoctor2)
        val doctor2Token = loginDoctor(url, restTemplate, usernameDoctor2, passwordDoctor2)

        val usernameDoctor3 = "d3"
        val passwordDoctor3 = "bar"
        val doctor3 = createDoctor(url, restTemplate, usernameDoctor3, passwordDoctor3)
        val doctor3Token = loginDoctor(url, restTemplate, usernameDoctor3, passwordDoctor3)

        createMood(url, restTemplate, user, userToken, emoji = CRITICAL_NEGATIVE_MOOD_EMOJI[0])
        val start1 = LocalDateTime.now()
        val mood2 = createMood(url, restTemplate, user, userToken, emoji = CRITICAL_NEGATIVE_MOOD_EMOJI[1])
        val start2 = LocalDateTime.now()
        val mood3 = createMood(url, restTemplate, user, userToken) // positive emoji
        val end = LocalDateTime.now()
        createMood(url, restTemplate, user, userToken, emoji = CRITICAL_NEGATIVE_MOOD_EMOJI[0])

        share(user, listOf(doctor1, doctor2), start1, end, userToken)
        share(user, listOf(doctor3), start2, end, userToken)

        val moodsForDoctor1 = getCriticalAllowedEmoji(doctor1Token)
        val moodsForDoctor2 = getCriticalAllowedEmoji(doctor2Token)
        val moodsForDoctor3 = getCriticalAllowedEmoji(doctor3Token)

        assertEquals(setOf(mood2.id), moodsForDoctor1.map { it.id }.toSet())
        assertEquals(setOf(mood2.id), moodsForDoctor2.map { it.id }.toSet())
        assertEquals(emptySet<Int>(), moodsForDoctor3.map { it.id }.toSet())

        share(user, listOf(doctor3), start1, start2, userToken)

        val secondMoodsForDoctor3 =  getCriticalAllowedEmoji(doctor3Token)
        assertEquals(setOf(mood2.id), secondMoodsForDoctor3.map { it.id }.toSet())
    }

    private fun share(
        userId: Int,
        doctorsIds: List<Int>,
        startDate: LocalDateTime,
        endDate: LocalDateTime,
        userToken: String,
    ): Array<Int> {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $userToken")
        val dto = ShareMoodTimeFrameWithDoctorsDto(userId, doctorsIds, startDate, endDate)
        val requestEntity = HttpEntity(dto, headers)
        val response = restTemplate.postForEntity(url.shareUserMood, requestEntity, Array<Int>::class.java)
        assertEquals(response.statusCode, HttpStatus.OK)
        return response.body ?: error("No response body")
    }

    private fun getCriticalAllowedEmoji(token: String): Array<UserMoodDto> {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val response = restTemplate.exchange(
            url.getCriticalMood(),
            HttpMethod.GET,
            HttpEntity<Any>(headers),
            Array<UserMoodDto>::class.java,
        )
        assertEquals(response.statusCode, HttpStatus.OK)
        return response.body ?: error("No response body")
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
}