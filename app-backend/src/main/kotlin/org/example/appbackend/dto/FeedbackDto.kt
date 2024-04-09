package org.example.appbackend.dto

import org.example.appbackend.entity.FeedbackEntity

data class FeedbackDto(
    val name: String?,
    val email: String?,
    val phone: String?,
    val companyName: String?,
    val rating: Int?,
    val comment: String?
)

fun FeedbackEntity.toDto() = FeedbackDto(name, email, phone, companyName, rating, comment)
