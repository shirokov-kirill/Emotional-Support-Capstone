package org.example.appbackend.controller

import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto
import org.example.appbackend.service.DoctorRecommendationsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

@RestController
class DoctorRecommendationsController(
    private val doctorRecommendationsService: DoctorRecommendationsService
) {

    @GetMapping("/recommendation/{userId}")
    fun getRecommendationForDoctor(@RequestHeader("Authorization") authToken: String, @PathVariable userId: Int) : RecommendationForDoctorDto {
        return doctorRecommendationsService.getRecommendationsByDoctor(authToken, userId)
    }
}