package org.example.appbackend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "user_mood")
class UserMood {

    @Id
    @GeneratedValue(generator = "user_mood_id_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_mood_id_sequence", sequenceName = "seq_user_mood_id", allocationSize = 1)
    var id: Int? = null

    @Column(name = "color")
    var color: String? = null

    @Column(name = "emoji")
    var emoji: String? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "created")
    var created: LocalDateTime? = null

    @Column(name = "userId")
    var userID: Int? = null
}