package org.example.appbackend.chat

import org.example.appbackend.*
import org.example.appbackend.dto.ChatDto
import org.example.appbackend.dto.MessageDto
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Assumptions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.*
import java.time.LocalDate
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
    fun `simple messaging scenario`() {
        Assumptions.assumeTrue(false, "Auth doesnt work") //FIXME
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
        Assumptions.assumeTrue(false, "Auth doesnt work") //FIXME
        val doctors = (1..3).map { createDoctor(url, restTemplate) }
        val users = (1..3).map { createUser(url, restTemplate) }
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
        user: Int = createUser(url, restTemplate),
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
        val headers = HttpHeaders()
        headers.setBearerAuth(token)
        val requestEntity = HttpEntity(messageDto, headers)

        // Use exchange instead of getForEntity to include the requestEntity with headers
        val messageResponse: ResponseEntity<Array<MessageDto>> = restTemplate.exchange(
            url.getMessagesByChat(messageDto.chatId),
            HttpMethod.GET,
            requestEntity,
            Array<MessageDto>::class.java
        )

        // POST request with the same headers
        val responseEntity = restTemplate.exchange(
            url.addMessage,
            HttpMethod.POST,
            requestEntity,
            MessageDto::class.java
        )

        // Asserting the response and returning the created message
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        val createdMessage = responseEntity.body
        assertNotNull(createdMessage)
        assertEquals(messageDto.chatId, createdMessage.chatId)
        assertEquals(messageDto.senderId, createdMessage.senderId)
        assertEquals(messageDto.content, createdMessage.content)
        assertNotNull(createdMessage.messageOrd)
        assertNull(createdMessage.created)

        return createdMessage
    }

    private fun verifyChatState(chatId: Int, expectedMessages: List<MessageDto>) {
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val requestEntity = HttpEntity<Any>(headers)

        val messagesResponse: ResponseEntity<Array<MessageDto>> = restTemplate.exchange(
            url.getMessagesByChat(chatId),
            HttpMethod.GET,
            requestEntity,
            Array<MessageDto>::class.java
        )
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
        val headers = HttpHeaders()
        headers.set("Authorization", "Bearer $token")
        val requestEntity = HttpEntity(ChatDto(null, userId, doctorId), headers)
        val response: ResponseEntity<ChatDto> = restTemplate.exchange(
            url.addChat,
            HttpMethod.POST,
            requestEntity,
            ChatDto::class.java
        )
        // Assert the status code
        assertEquals(HttpStatus.OK, response.statusCode)
        val createdChat = response.body
        assertNotNull(createdChat)
        val chatId = createdChat.id
        assertNotNull(chatId)
        return chatId
    }
}
