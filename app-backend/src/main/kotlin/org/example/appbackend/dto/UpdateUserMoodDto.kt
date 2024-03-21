package org.example.appbackend.dto

data class UpdateUserMoodDto(
    val id: Int?,
    val color: String?,
    val emoji: String?,
    val description: String?,
    val userID: Int?
)