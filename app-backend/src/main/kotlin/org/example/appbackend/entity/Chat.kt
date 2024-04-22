package org.example.appbackend.entity

import jakarta.persistence.*

@Entity
@Table(
    name = "chats",
    uniqueConstraints = [
        UniqueConstraint(name = "uq_chats_user_doctor", columnNames = ["user_id", "doctor_id"])
    ],
    indexes = [
        Index(name = "idx_chats_user", columnList = "user_id"),
        Index(name = "idx_chats_doctor", columnList = "doctor_id")
    ]
)
class Chat {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(generator = "chat_id_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "chat_id_sequence", sequenceName = "chat_id", allocationSize = 1)
    var id: Int? = null

    @Column(name = "user_id", nullable = false)
    var userId: Int? = null

    @Column(name = "doctor_id", nullable = false)
    var doctorId: Int? = null
}
