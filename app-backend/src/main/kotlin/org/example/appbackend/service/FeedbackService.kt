package org.example.appbackend.service

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.entity.FeedbackEntity

interface FeedbackService {
    fun saveFeedback(feedbackDto: FeedbackDto): FeedbackDto

    fun getAllFeedback(): List<FeedbackDto>
}