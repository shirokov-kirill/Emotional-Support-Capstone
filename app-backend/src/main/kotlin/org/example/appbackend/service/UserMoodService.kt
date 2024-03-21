package org.example.appbackend.service

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto

interface UserMoodService {

    fun create(dto: CreateUserMoodDto): UserMoodDto
    fun get(id: Int): UserMoodDto
    fun update(dto: UpdateUserMoodDto): UserMoodDto
    fun delete(id: Int)
}