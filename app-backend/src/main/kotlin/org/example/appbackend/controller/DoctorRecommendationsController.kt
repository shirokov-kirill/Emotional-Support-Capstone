package org.example.appbackend.controller

import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto
import org.example.appbackend.service.DoctorRecommendationsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class DoctorRecommendationsController(
    private val doctorRecommendationsService: DoctorRecommendationsService
) {

    @GetMapping("/recommendation/{doctorId}/{userId}")
    fun getRecommendationForDoctor(@PathVariable doctorId: Int, @PathVariable userId: Int) : RecommendationForDoctorDto {
        val dto = GetRecommendationForDoctorDto(doctorId, userId)
        return doctorRecommendationsService.getRecommendationsByDoctor(dto)
    }
}