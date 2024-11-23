package org.example.appbackend.mapper

import org.example.appbackend.dto.FeedbackDto
import org.example.appbackend.dto.PostFeedbackDto
import org.example.appbackend.entity.FeedbackEntity
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface FeedbackEntityMapper {

    fun dtoToEntity(feedbackDto: PostFeedbackDto): FeedbackEntity

    fun entityToDto(feedbackEntity: FeedbackEntity): FeedbackDto
}