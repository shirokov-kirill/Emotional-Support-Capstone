package org.example.appbackend.chat

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.Url
import org.example.appbackend.createDoctor
import org.example.appbackend.dto.ChatDto
import org.example.appbackend.dto.MessageDto
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
class MessagesIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    @Test
    fun `simple messaging scenario`() {
        testChat { chatId, user, doctor ->
            chat(chatId) {
                user writes "Hello, doctor!"
                doctor writes "Hello, patient!"
                doctor writes "How are you?"
                user writes "I'm fine, thank you!"
            }
        }
    }

    @Test
    fun `messaging scenario with multiple users`() {
        val doctors = (1..3).map { createDoctor(url, restTemplate) }
        val users = (1..3).map { Random.nextInt() }
        users.forEach { userId ->
            doctors.forEach { doctorId ->
                testChat(userId, doctorId) { chatId, user, doctor ->
                    chat(chatId) {
                        user writes "Hello, doctor!"
                        doctor writes "Hello, patient!"
                        doctor writes "How are you?"
                        user writes "I'm fine, thank you!"
                    }
                }
            }
        }
    }

    private fun testChat(
        user: Int = Random.nextInt(),
        doctor: Int = createDoctor(url, restTemplate),
        messagesBuilder: (chat: Int, user: Int, doctor: Int) -> List<MessageDto>,
    ) {
        val chatId = createChat(user, doctor)
        val messages = messagesBuilder(chatId, user, doctor)
        val expectedMessages = mutableListOf<MessageDto>()
        verifyChatState(chatId, expectedMessages)
        messages.forEach { message ->
            sendMessage(message)
            expectedMessages.add(message)
            verifyChatState(chatId, expectedMessages)
        }
    }

    private fun sendMessage(messageDto: MessageDto): MessageDto {
        val messagesResponse =
            restTemplate.getForEntity(url.getMessagesByChat(messageDto.chatId), Array<MessageDto>::class.java)
        println(messagesResponse.body?.asList())
        val response = restTemplate.postForEntity(url.addMessage, messageDto, MessageDto::class.java)
        assertEquals(HttpStatus.OK, response.statusCode)
        val createdMessage = response.body
        assertNotNull(createdMessage)
        assertEquals(messageDto.chatId, createdMessage.chatId)
        assertEquals(messageDto.senderId, createdMessage.senderId)
        assertEquals(messageDto.content, createdMessage.content)
        assertNotNull(createdMessage.messageOrd)
        assertNull(createdMessage.created)
        // Because timestamp is set after the transaction finalizes
        // In the following requests, the timestamp will be set
        return createdMessage
    }

    private fun verifyChatState(chatId: Int, expectedMessages: List<MessageDto>) {
        val messagesResponse = restTemplate.getForEntity(url.getMessagesByChat(chatId), Array<MessageDto>::class.java)
        assertEquals(HttpStatus.OK, messagesResponse.statusCode)
        val messages = messagesResponse.body?.asList()?.reversed()
        // reversed() is used because the messages are sorted in ascending order by default
        assertNotNull(messages)
        assertEquals(expectedMessages.size, messages.size)
        messages.forEach { message ->
            assertEquals(chatId, message.chatId)
        }
        messages.forEachIndexed { index, message ->
            assertEquals(index + 1, message.messageOrd)
        }
        messages.zipWithNext().forEach { (previous, next) ->
            val previousCreated = previous.created
            val nextCreated = next.created
            assertNotNull(previousCreated)
            assertNotNull(nextCreated)
            assertTrue(previousCreated <= nextCreated)
        }
        expectedMessages.zip(messages).forEach { (expected, actual) ->
            assertEquals(expected.senderId, actual.senderId)
            assertEquals(expected.content, actual.content)
        }
    }

    private fun createChat(userId: Int, doctorId: Int): Int {
        val chatDto = ChatDto(null, userId, doctorId)
        val response = restTemplate.postForEntity(url.addChat, chatDto, ChatDto::class.java)
        assertEquals(HttpStatus.OK, response.statusCode)
        val createdChat = response.body
        assertNotNull(createdChat)
        val chatId = createdChat.id
        assertNotNull(chatId)
        return chatId
    }
}
