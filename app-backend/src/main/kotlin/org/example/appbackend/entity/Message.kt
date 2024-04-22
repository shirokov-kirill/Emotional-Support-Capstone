package org.example.appbackend.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.io.Serializable
import java.time.LocalDateTime

@Entity
@IdClass(MessagePk::class)
@Table(
    name = "messages",
    indexes = [
        Index(name = "idx_messages_chat", columnList = "chat_id"),
    ],
)
class Message {

    @Id
    @Column(name = "chat_id", nullable = false)
    var chatId: Int? = null

    @Id
    @Column(name = "message_ord", nullable = false)
    var messageOrd: Int? = null

    @Column(name = "sender_id", nullable = false)
    var senderId: Int? = null

    @CreationTimestamp
    @Column(name = "created", nullable = false, updatable = false)
    var created: LocalDateTime? = null

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    var content: String? = null
}

@IdClass(MessagePk::class)
class MessagePk(
    var chatId: Int = 0,
    var messageOrd: Int = 0
) : Serializable
