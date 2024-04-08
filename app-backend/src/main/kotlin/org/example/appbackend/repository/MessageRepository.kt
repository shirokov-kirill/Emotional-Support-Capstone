package org.example.appbackend.repository

import org.example.appbackend.entity.Message
import org.example.appbackend.entity.MessagePk
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface MessageRepository : JpaRepository<Message, MessagePk> {
    fun findByChatIdOrderByMessageOrdDesc(chatId: Int): List<Message>

    @Query("SELECT m FROM Message m WHERE m.chatId = :chatId ORDER BY m.messageOrd DESC LIMIT 1")
    fun findMaxMessageOrdByChatId(@Param("chatId") chatId: Int?): Message?
}
