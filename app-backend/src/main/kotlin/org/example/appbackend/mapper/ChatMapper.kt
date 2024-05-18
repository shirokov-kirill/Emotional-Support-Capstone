package org.example.appbackend.mapper

import org.example.appbackend.dto.ChatDto
import org.example.appbackend.entity.Chat
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface ChatMapper {
    fun entityToDto(chat: Chat): ChatDto
    fun dtoToEntity(chatDTO: ChatDto): Chat
}
