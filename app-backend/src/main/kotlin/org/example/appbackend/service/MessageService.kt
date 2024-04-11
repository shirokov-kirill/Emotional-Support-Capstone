package org.example.appbackend.service

import org.example.appbackend.dto.MessageDto

interface MessageService {
    fun createMessage(messageDto: MessageDto): MessageDto
    fun getMessageById(chatId: Int, messageOrd: Int): MessageDto
    fun getAllMessagesByChatId(chatId: Int): List<MessageDto>
    fun updateMessage(messageDto: MessageDto): MessageDto
}
