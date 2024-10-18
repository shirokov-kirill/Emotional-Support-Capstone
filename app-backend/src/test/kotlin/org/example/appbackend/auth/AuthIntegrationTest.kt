package org.example.appbackend.auth

import org.example.appbackend.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class AuthIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    @Test
    fun `test user login`() {
        val username = "testuser"
        val password = "password"
        createUser(url, restTemplate, username, password, email = "testuser@example.com")
        val token = loginUser(url, restTemplate, username, password)
        assertEquals(true, token.isNotEmpty())
    }

    @Test
    fun `test update password`() {
        val username = "updatableUser"
        val oldPassword = "oldPassword"
        val newPassword = "newPassword"
        createUser(url, restTemplate, username, oldPassword, email = "updatable@example.com")
        updatePassword(url, restTemplate, username, newPassword)
        val token = loginUser(url, restTemplate, username, newPassword)
        assertEquals(true, token.isNotEmpty())
    }
}