package org.example.appbackend.mapper

import org.example.appbackend.dto.MessageDto
import org.example.appbackend.entity.Message
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface MessageMapper {
    fun entityToDto(message: Message): MessageDto
    fun dtoToEntity(messageDTO: MessageDto): Message
}
