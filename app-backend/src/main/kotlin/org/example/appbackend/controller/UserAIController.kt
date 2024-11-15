package org.example.appbackend.controller

import org.example.appbackend.dto.BreathExerciseForUserDto
import org.example.appbackend.dto.GetBreathExerciseForUserDto
import org.example.appbackend.dto.UserDto
import org.example.appbackend.service.UserAIService
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user/ai")
class UserAIController(
    private val userAIService: UserAIService
) {
    private var logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping("/breath")
    fun getUserById(authentication: Authentication, mood: String): BreathExerciseForUserDto {
        val userPrincipal = authentication.principal as UserDto
        val userId = userPrincipal.id
        return userAIService.getBreathExercise(GetBreathExerciseForUserDto(userId, mood))
    }
}
