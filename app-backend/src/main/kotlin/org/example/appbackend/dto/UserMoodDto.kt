package org.example.appbackend.dto

import java.time.LocalDateTime

data class UserMoodDto(
    val id: Int?,
    val color: String?,
    val emoji: String?,
    val description: String?,
    val created: LocalDateTime?,
    val userID: Int?
)