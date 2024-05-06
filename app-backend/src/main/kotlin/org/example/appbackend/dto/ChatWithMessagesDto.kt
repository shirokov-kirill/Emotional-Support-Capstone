package org.example.appbackend.dto

data class ChatProfileDto(
    val id: Int,
    val url: String,
    val author: String
)

data class ChatWithMessagesDto(
    val user: ChatProfileDto,
    val doctor: ChatProfileDto,
    val messages: List<MessageDto>
)