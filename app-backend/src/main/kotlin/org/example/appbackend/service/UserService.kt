package org.example.appbackend.service

import org.example.appbackend.dto.UserDto
import org.example.appbackend.dto.CreateUserDto
import org.example.appbackend.entity.User
import org.example.appbackend.mapper.UserMapper
import org.example.appbackend.repository.UserRepository
import org.springframework.stereotype.Service

interface UserService{
    fun createUser(userDto: CreateUserDto): UserDto

    fun getUserById(userId: Int): UserDto

    fun getUserByUsername(username: String): UserDto

    fun authenticateUser(username: String, password: String): UserDto

    fun updatePassword(username: String, password: String): UserDto
}