package org.example.appbackend.mapper

import org.example.appbackend.dto.UserMoodSharingDto
import org.example.appbackend.entity.UserMoodSharing
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface UserMoodSharingMapper {

    fun entityToDto(userMood: UserMoodSharing): UserMoodSharingDto
    fun dtoToEntity(createUserMoodDto: UserMoodSharingDto): UserMoodSharing
}