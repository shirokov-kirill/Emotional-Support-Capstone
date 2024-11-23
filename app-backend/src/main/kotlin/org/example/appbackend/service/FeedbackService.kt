package org.example.appbackend.service

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.dto.PostFeedbackDto

interface FeedbackService {
    fun saveFeedback(feedbackDto: PostFeedbackDto): FeedbackDto

    fun getAllFeedback(): List<FeedbackDto>
}