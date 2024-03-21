package org.example.appbackend.mapper

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.entity.UserMood
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface UserMoodMapper {

    fun dtoToEntity(userMoodDto: UserMoodDto): UserMood
    fun entityToDto(userMood: UserMood): UserMoodDto
    fun createDtoToEntity(createUserMoodDto: CreateUserMoodDto): UserMood
}