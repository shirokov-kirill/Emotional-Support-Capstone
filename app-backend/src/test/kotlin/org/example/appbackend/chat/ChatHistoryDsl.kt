package org.example.appbackend.chat

import org.example.appbackend.dto.MessageDto

class ChatHistory(private val chatId: Int) {
    val history = mutableListOf<MessageDto>()

    infix fun Int.writes(content: String) {
        history.add(createMessage(this, content))
    }

    private fun createMessage(senderId: Int, content: String) =
        MessageDto(chatId, null, senderId, null, content)
}

fun chat(chatId: Int, block: ChatHistory.() -> Unit) = ChatHistory(chatId).apply(block).history
