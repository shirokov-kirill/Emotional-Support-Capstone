package org.example.appbackend.dto

import java.time.LocalDateTime

data class MessageDto(
    val chatId: Int,
    val messageOrd: Int?,
    val senderId: Int,
    val created: LocalDateTime?,
    val content: String
)
