package org.example.appbackend.service

import org.example.appbackend.dto.ChatWithMessagesDto

interface ChatWithMessagesService {
    fun getChatWithMessagesAndProfiles(chatId: Int): ChatWithMessagesDto
}