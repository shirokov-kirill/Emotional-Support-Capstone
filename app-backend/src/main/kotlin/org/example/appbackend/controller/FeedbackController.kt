package org.example.appbackend.controller

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.dto.PostFeedbackDto
import org.example.appbackend.service.FeedbackService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class FeedbackController(
    private val feedbackService: FeedbackService,
) {

    @PostMapping("/feedback")
    fun postFeedback(@RequestBody feedbackDto: PostFeedbackDto): FeedbackDto {
        return feedbackService.saveFeedback(feedbackDto)
    }

    @GetMapping("/feedback")
    fun getFeedback(): List<FeedbackDto> {
        return feedbackService.getAllFeedback()
    }
}
