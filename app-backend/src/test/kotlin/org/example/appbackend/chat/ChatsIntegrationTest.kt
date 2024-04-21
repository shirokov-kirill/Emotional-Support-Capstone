package org.example.appbackend.chat

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.Url
import org.example.appbackend.createDoctor
import org.example.appbackend.dto.ChatDto
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import kotlin.random.Random
import kotlin.test.assertNotNull


@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class ChatsIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

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
        val chatsResponse = restTemplate.getForEntity(url.getChatsByUser(userId), Array<ChatDto>::class.java)
        assertEquals(HttpStatus.OK, chatsResponse.statusCode)
        val chats = chatsResponse.body
        assertNotNull(chats)
        assertEquals(expectedChats.size, chats.size)
        assertTrue(chats.all { expectedChats.contains(it) })
    }

    private fun verifyChatsResponseDoctor(doctorId: Int, expectedChats: MutableSet<ChatDto>) {
        val chatsResponse = restTemplate.getForEntity(url.getChatsByDoctor(doctorId), Array<ChatDto>::class.java)
        assertEquals(HttpStatus.OK, chatsResponse.statusCode)
        val chats = chatsResponse.body
        assertNotNull(chats)
        assertEquals(expectedChats.size, chats.size)
        assertTrue(chats.all { expectedChats.contains(it) })
    }

    private fun createChatAndVerifyResponse(userId: Int, doctorId: Int): ChatDto {
        val chatDto = ChatDto(null, userId, doctorId)
        val response = restTemplate.postForEntity(url.addChat, chatDto, ChatDto::class.java)
        assertEquals(HttpStatus.OK, response.statusCode)
        val createdChat = response.body
        assertNotNull(createdChat)
        assertEquals(chatDto.userId, createdChat.userId)
        assertEquals(chatDto.doctorId, createdChat.doctorId)
        assertNotNull(createdChat.id)
        return createdChat
    }
}
