package org.example.appbackend.chat

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.Url
import org.example.appbackend.createDoctor
import org.example.appbackend.createUser
import org.example.appbackend.loginUser
import org.example.appbackend.dto.ChatDto
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.*
import java.time.LocalDate
import kotlin.random.Random

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class ChatsIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    private lateinit var token: String

    @BeforeEach
    fun setup() {
        val username = "test_messages_users"
        val password = "test_messages_password"
        val userId = createUser(
            url, restTemplate,
            username = username,
            password = password,
            firstName = "John",
            lastName = "Doe",
            email = "john.doe@example.com",
            dateOfBirth = LocalDate.of(1990, 5, 15),
            gender = "Male"
        )
        token = loginUser(url, restTemplate, username, password)
    }

    @Test
    fun `create and retrieve chats for user`() {
        val userId = Random.nextInt()
        val doctorIds = (1..3).map { createDoctor(url, restTemplate) }.toSet()
        val expectedChats = mutableSetOf<ChatDto>()
        verifyChatsResponseUser(userId, expectedChats)
        doctorIds.forEach { doctorId ->
            expectedChats.add(createChatAndVerifyResponse(userId, doctorId))
            verifyChatsResponseUser(userId, expectedChats)
        }
    }

    @Test
    fun `create and retrieve messages for doctor`() {
        val userIds = (1..3).map { Random.nextInt() }.toSet()
        val doctorId = createDoctor(url, restTemplate)
        val expectedChats = mutableSetOf<ChatDto>()
        verifyChatsResponseDoctor(doctorId, expectedChats)
        userIds.forEach { userId ->
            expectedChats.add(createChatAndVerifyResponse(userId, doctorId))
            verifyChatsResponseDoctor(doctorId, expectedChats)
        }
    }

    private fun verifyChatsResponseUser(userId: Int, expectedChats: MutableSet<ChatDto>) {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val requestEntity = HttpEntity<Any>(headers)

        val chatsResponse = restTemplate.exchange(
            url.getChatsByUser(userId),
            HttpMethod.GET,
            requestEntity,
            Array<ChatDto>::class.java
        )

        assertEquals(HttpStatus.OK, chatsResponse.statusCode)
        val chats = chatsResponse.body
        assertNotNull(chats)
        assertEquals(expectedChats.size, chats?.size)
        assertTrue(chats?.all { expectedChats.contains(it) } ?: false)
    }

    private fun verifyChatsResponseDoctor(doctorId: Int, expectedChats: MutableSet<ChatDto>) {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val requestEntity = HttpEntity<Any>(headers)

        val chatsResponse = restTemplate.exchange(
            url.getChatsByDoctor(doctorId),
            HttpMethod.GET,
            requestEntity,
            Array<ChatDto>::class.java
        )

        assertEquals(HttpStatus.OK, chatsResponse.statusCode)
        val chats = chatsResponse.body
        assertNotNull(chats)
        assertEquals(expectedChats.size, chats?.size)
        assertTrue(chats?.all { expectedChats.contains(it) } ?: false)
    }

    private fun createChatAndVerifyResponse(userId: Int, doctorId: Int): ChatDto {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val requestEntity = HttpEntity(ChatDto(null, userId, doctorId), headers)

        val response = restTemplate.exchange(
            url.addChat,
            HttpMethod.POST,
            requestEntity,
            ChatDto::class.java
        )

        assertEquals(HttpStatus.OK, response.statusCode)
        val createdChat = response.body
        assertNotNull(createdChat)
        assertEquals(userId, createdChat?.userId)
        assertEquals(doctorId, createdChat?.doctorId)
        assertNotNull(createdChat?.id)
        return createdChat!!
    }
}
