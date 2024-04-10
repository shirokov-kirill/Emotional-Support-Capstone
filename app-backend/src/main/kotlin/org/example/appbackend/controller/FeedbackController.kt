package org.example.appbackend.controller

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.entity.FeedbackEntity
import org.example.appbackend.mapper.FeedbackEntityMapper
import org.example.appbackend.repository.FeedbackRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class FeedbackController(
    private val feedbackRepository: FeedbackRepository,
    private val feedbackEntityMapper: FeedbackEntityMapper
) {

    @PostMapping("/feedback")
    fun postFeedback(@RequestBody feedbackDto: FeedbackDto): FeedbackEntity {
        val feedback = feedbackEntityMapper.dtoToEntity(feedbackDto)
        return feedbackRepository.save(feedback)
    }

    @GetMapping("/feedback")
    fun getFeedback(): List<FeedbackDto> =
        feedbackRepository.findAll().map { feedbackEntityMapper.entityToDto(it) }
}
