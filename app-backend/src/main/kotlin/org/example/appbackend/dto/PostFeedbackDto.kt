package org.example.appbackend.dto

data class PostFeedbackDto(
    val name: String?,
    val email: String?,
    val phone: String?,
    val companyName: String?,
    val rating: Int?,
    val comment: String?
)