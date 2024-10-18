package org.example.appbackend.user

import org.example.appbackend.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.junit.jupiter.api.Assertions.assertEquals
import java.time.LocalDate

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class UserIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    @Test
    fun `test create user`() {
        val username = "newUser"
        val password = "password123"
        val userId = createUser(
            url,
            restTemplate,
            username,
            password,
            firstName = "Test",
            lastName = "User",
            email = "newuser@example.com",
            dateOfBirth = LocalDate.of(1990, 1, 1)
        )
        assertEquals(true, userId > 0)
    }

    @Test
    fun `test update user mood`() {
        val username = "moodUser"
        val password = "password456"
        val userId = createUser(url, restTemplate, username, password, email = "mooduser@example.com")
        val userToken = loginUser(url, restTemplate, username, password)

        val updatedMoodId = updateUserMoodDto(
            url,
            restTemplate,
            id = null,
            color = "blue",
            emoji = ":D",
            description = "Feeling great!"
        )

        assertEquals(true, updatedMoodId > 0)
    }
}