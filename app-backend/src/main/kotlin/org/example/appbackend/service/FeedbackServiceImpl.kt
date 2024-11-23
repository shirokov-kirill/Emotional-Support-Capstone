package org.example.appbackend.service

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.entity.FeedbackEntity
import org.example.appbackend.mapper.FeedbackEntityMapper
import org.example.appbackend.repository.FeedbackRepository
import org.springframework.stereotype.Service

@Service
class FeedbackServiceImpl(
    private val feedbackRepository: FeedbackRepository,
    private val feedbackEntityMapper: FeedbackEntityMapper
) : FeedbackService {
    override fun saveFeedback(feedbackDto: FeedbackDto): FeedbackDto {
        val feedback = feedbackEntityMapper.dtoToEntity(feedbackDto)
        val feedbackEntity = feedbackRepository.save(feedback)
        return feedbackEntityMapper.entityToDto(feedbackEntity)
    }

    override fun getAllFeedback(): List<FeedbackDto> {
        return feedbackRepository.findAll().map { feedbackEntityMapper.entityToDto(it) }
    }
}