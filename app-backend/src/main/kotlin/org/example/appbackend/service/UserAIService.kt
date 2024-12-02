package org.example.appbackend.service

import org.example.appbackend.dto.BreathExerciseForUserDto
import org.example.appbackend.dto.GetBreathExerciseForUserDto

interface UserAIService {
    fun getBreathExercise(request: GetBreathExerciseForUserDto): BreathExerciseForUserDto
}
