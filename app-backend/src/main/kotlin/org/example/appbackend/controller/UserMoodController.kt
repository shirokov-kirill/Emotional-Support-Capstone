package org.example.appbackend.controller

import org.example.appbackend.dto.*
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
    fun createUserMood(@RequestHeader("Authorization") authToken: String,
                       @RequestBody dto: CreateUserMoodDto): UserMoodDto {
        logger.info("Creating {}", dto)
        return userMoodService.create(authToken, dto)
    }

    @GetMapping("user-mood/get/{id}")
    fun getUserMood(@PathVariable("id") id: Int): UserMoodDto {
        logger.info("Receiving user mood by id: {}", id)
        return userMoodService.get(id)
    }

    /**
     * Retrieves the user mood for the given time frame.
     *
     * @param authToken the auth Token of the user.
     * @param startDateTime the start date and time of the time frame (included).
     * @param endDateTime the end date and time of the time frame (excluded).
     * @return a map representing the user mood for each date in the time frame, where the key is the date and the value is the corresponding UserMoodDto.
     */
    @GetMapping("user-mood/getByUser/timeframe")
    fun getUserMoodByTimeFrame(@RequestHeader("Authorization") authToken: String,
                               @RequestParam("start") startDateTime: LocalDate,
                               @RequestParam("end") endDateTime: LocalDate): Map<LocalDate, UserMoodDto> {
        logger.info("Receiving user mood for timeframe: {} to {}", startDateTime, endDateTime)
        return userMoodService.getUserMoodForTimeFrame(authToken, startDateTime, endDateTime)
    }

    @GetMapping("user-mood/getCriticalUsersMoodByDoctor")
    fun getCriticalUsersMoodByDoctorId(@RequestHeader("Authorization") authToken: String): List<UserMoodDto> {
        logger.info("Receiving patients of doctor {}", authToken)
        return userMoodService.getCriticalUsersMoodByDoctorToken(authToken)
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

    @PostMapping("user-mood/share")
    fun shareMoodTimeFrameWithDoctors(@RequestBody dto: ShareMoodTimeFrameWithDoctorsDto): List<Int> {
        logger.info("Receiving user mood sharing timeframe: {}", dto)
        return userMoodService.shareTimeFrame(dto)
    }

    @GetMapping("user-mood/get-allowed/{userId}/{doctorId}")
    fun getUserMoodByFrame(
        @PathVariable("userId") userId: Int,
        @PathVariable("doctorId") doctorId: Int,
    ): List<UserMoodDto> {
        logger.info("Receiving allowed user moods: {}", userId)
        return userMoodService.getAllowedUserMoods(userId, doctorId)
    }

    @GetMapping("getRecommendedDoctorsByMoods")
    fun getRecommendedDoctorsByMoods(@RequestHeader("Authorization") authToken: String): List<DoctorRecommendationDto> {
        logger.info("Get recommended doctors")
        return userMoodService.getRecommendedDoctorsByMoods(authToken)
    }
}