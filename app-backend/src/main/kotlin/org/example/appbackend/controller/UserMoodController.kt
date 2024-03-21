package org.example.appbackend.controller

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.service.UserMoodService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

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

    @GetMapping("user-mood/getByUser/{userId}/timeframe")
    fun getUserMoodByTimeFrame(@PathVariable("userId") userId: Int,
                               @RequestParam("start") startDateTime: LocalDate,
                               @RequestParam("end") endDateTime: LocalDate): Map<LocalDate, UserMoodDto> {
        logger.info("Receiving user mood for timeframe: {} to {}", startDateTime, endDateTime)
        return userMoodService.getUserMoodForTimeFrame(userId, startDateTime, endDateTime)
    }

    @PutMapping("user-mood/update")
    fun updateUserMood(@RequestBody dto: UpdateUserMoodDto): UserMoodDto {
        logger.info("Updating user mood: {}", dto)
        return userMoodService.update(dto)
    }

    @DeleteMapping("user-mood/delete/{id}")
    fun deleteUserMood(@PathVariable("id") id: Int) {
        logger.info("Deleting user mood with id: {}", id)
        userMoodService.delete(id)
    }
}