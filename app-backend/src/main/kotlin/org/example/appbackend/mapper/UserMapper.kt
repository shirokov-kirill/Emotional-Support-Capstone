package org.example.appbackend.mapper

import org.example.appbackend.dto.CreateUserDto
import org.example.appbackend.dto.UserDto
import org.example.appbackend.entity.User
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface UserMapper {

    fun createDtoToEntity(dto: CreateUserDto): User

    fun dtoToEntity(dto: UserDto): User

    fun entityToDto(entity: User): UserDto
}