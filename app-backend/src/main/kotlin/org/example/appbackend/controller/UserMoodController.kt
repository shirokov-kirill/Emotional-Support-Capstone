package org.example.appbackend.controller

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.service.UserMoodService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserMoodController(
    private val userMoodService: UserMoodService,
) {
    private var logger = LoggerFactory.getLogger(UserMoodController::class.java)

    @PostMapping("user-mood/create")
    fun createUserMood(@RequestBody dto: CreateUserMoodDto): UserMoodDto {
        logger.info("Creating {}", dto)
        return userMoodService.create(dto)
    }

    @GetMapping("user-mood/get/{id}")
    fun getUserMood(@PathVariable("id") id: Int): UserMoodDto {
        logger.info("Receiving user mood by id: {}", id)
        return userMoodService.get(id)
    }

    @PutMapping("user-mood/update")
    fun updateUserMood(@RequestBody dto: UserMoodDto): UserMoodDto {
        logger.info("Updating user mood: {}", dto)
        return userMoodService.update(dto)
    }

    @DeleteMapping("user-mood/delete/{id}")
    fun deleteUserMood(@PathVariable("id") id: Int) {
        logger.info("Deleting user mood with id: {}", id)
        userMoodService.delete(id)
    }
}