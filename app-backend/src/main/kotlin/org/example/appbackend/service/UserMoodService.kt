package org.example.appbackend.service

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import java.time.LocalDate

interface UserMoodService {

    fun create(dto: CreateUserMoodDto): UserMoodDto
    fun get(id: Int): UserMoodDto
    fun update(dto: UpdateUserMoodDto): UserMoodDto
    fun getUserMoodForTimeFrame(userId: Int, startDate: LocalDate, endDate: LocalDate): Map<LocalDate, UserMoodDto>
    fun delete(id: Int)
}