package org.example.appbackend.dto

data class CreateUserMoodDto(
    val color: String?,
    val emoji: String?,
    val description: String?,
    val userId: Int?
)