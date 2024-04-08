package org.example.appbackend.controller

import org.example.appbackend.dto.ChatDto
import org.example.appbackend.dto.MessageDto
import org.example.appbackend.service.ChatService
import org.example.appbackend.service.MessageService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*

@RestController
class MessagingController(
    private val chatService: ChatService,
    private val messageService: MessageService
) {
    private val logger = LoggerFactory.getLogger(MessagingController::class.java)

    @PostMapping("/chats")
    fun createChat(@RequestBody chatDto: ChatDto): ChatDto {
        logger.info("Creating chat: {}", chatDto)
        return chatService.createChat(chatDto)
    }

    @GetMapping("/chats/user/{userId}")
    fun getChatsByUserId(@PathVariable userId: Int): List<ChatDto> {
        logger.info("Fetching chats for user ID: {}", userId)
        return chatService.getAllChatsByUserId(userId)
    }

    @GetMapping("/chats/doctor/{doctorId}")
    fun getChatsByDoctorId(@PathVariable doctorId: Int): List<ChatDto> {
        logger.info("Fetching chats for doctor ID: {}", doctorId)
        return chatService.getAllChatsByDoctorId(doctorId)
    }

    @PostMapping("/messages")
    fun createMessage(@RequestBody messageDto: MessageDto): MessageDto {
        logger.info("Creating message: {}", messageDto)
        return messageService.createMessage(messageDto)
    }

    @GetMapping("/messages/{chatId}")
    fun getMessagesByChatId(@PathVariable chatId: Int): List<MessageDto> {
        logger.info("Fetching messages for chat ID: {}", chatId)
        return messageService.getAllMessagesByChatId(chatId)
    }
}
