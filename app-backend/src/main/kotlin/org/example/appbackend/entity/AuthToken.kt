package org.example.appbackend.entity

import jakarta.persistence.*

@Entity
@Table(name = "jwt_tokens")
class AuthToken(
    @Id
    @Column(name = "token", nullable = false)
    val token: String = "",

    @Column(name = "user_id", nullable = false)
    val userId: Int = 0
)