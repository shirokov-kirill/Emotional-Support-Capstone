package org.example.appbackend.dto

import java.time.LocalDateTime

data class CreateUserMoodDto(
    val color: String?,
    val emoji: String?,
    val description: String?,
    val created: LocalDateTime?,
    val userID: Int?
)