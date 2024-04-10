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
@Table(name = "feedback")
class FeedbackEntity() {

    @Id
    @GeneratedValue(generator = SEQUENCE_GENERATOR_NAME, strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = SEQUENCE_GENERATOR_NAME, sequenceName = SEQUENCE_NAME, allocationSize = 1)
    var id: Int? = null

    @Column(name = "created")
    var created: LocalDateTime? = null

    @Column(name = "name")
    var name: String? = null

    @Column(name = "email")
    var email: String? = null

    @Column(name = "phone")
    var phone: String? = null

    @Column(name = "company")
    var companyName: String? = null

    @Column(name = "rating")
    var rating: Int? = null

    @Column(name = "comment")
    var comment: String? = null

    companion object {
        private const val SEQUENCE_GENERATOR_NAME = "feedback_id_sequence"
        private const val SEQUENCE_NAME = "seq_feedback_id"
    }
}
