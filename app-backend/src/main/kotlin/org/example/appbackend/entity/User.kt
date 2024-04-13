package org.example.appbackend.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User {
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
        @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
        @Column(name = "id")
        val id: Int? = null

        @Column(name = "username")
        var username: String = ""

        @Column(name = "password")
        var password: String? = null

        @Column(name = "first_name")
        var firstName: String? = null

        @Column(name = "last_name")
        var lastName: String? = null

        @Column(name = "email")
        var email: String? = null

        @Column(name = "date_of_birth")
        var dateOfBirth: LocalDate? = null

        @Column(name = "gender")
        var gender: String? = null

        @Column(name = "created_at")
        var createdAt: LocalDateTime? = LocalDateTime.now()

        @Column(name = "updated_at")
        var updatedAt: LocalDateTime? = null

        @Column(name = "deleted_at")
        var deletedAt: LocalDateTime? = null
}