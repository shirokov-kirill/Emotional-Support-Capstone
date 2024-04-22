package org.example.appbackend.service

import org.example.appbackend.dto.ChatDto

interface ChatService {
    fun createChat(chatDto: ChatDto): ChatDto
    fun getChatById(id: Int): ChatDto
    fun getAllChatsByUserId(userId: Int): List<ChatDto>
    fun getAllChatsByDoctorId(doctorId: Int): List<ChatDto>
}
