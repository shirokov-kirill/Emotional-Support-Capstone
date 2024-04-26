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
@Table(name = "user_mood_sharing")
class UserMoodSharing {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(generator = "user_mood_sharing_id_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_mood_sharing_id_sequence", sequenceName = "seq_user_mood_sharing_id", allocationSize = 1)
    var id: Int? = null

    @Column(name = "user_id")
    var userId: Int? = null

    @Column(name = "doctor_id")
    var doctorId: Int? = null

    @Column(name = "start_date")
    var startDate: LocalDateTime? = null

    @Column(name = "end_date")
    var endDate: LocalDateTime? = null

    @Column(name = "created")
    var created: LocalDateTime? = null

    @Column(name = "updated")
    var updated: LocalDateTime? = null
}