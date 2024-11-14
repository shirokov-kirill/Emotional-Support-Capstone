package org.example.appbackend.controller

import org.example.appbackend.dto.GetLiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.GetRecommendationForDoctorDto
import org.example.appbackend.dto.LiteratureRecommendationsForDoctorDto
import org.example.appbackend.dto.RecommendationForDoctorDto
import org.example.appbackend.service.DoctorRecommendationsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController("/recommendation")
class DoctorRecommendationsController(
    private val doctorRecommendationsService: DoctorRecommendationsService
) {

    @GetMapping("/{doctorId}/{userId}")
    fun getRecommendationForDoctor(@PathVariable doctorId: Int, @PathVariable userId: Int) : RecommendationForDoctorDto {
        val dto = GetRecommendationForDoctorDto(doctorId, userId)
        return doctorRecommendationsService.getRecommendationsForDoctor(dto)
    }

    @GetMapping("/literature")
    fun getLiteratureRecommendationsForDoctor(@RequestBody dto: GetLiteratureRecommendationsForDoctorDto) : LiteratureRecommendationsForDoctorDto =
        doctorRecommendationsService.getLiteratureRecommendations(dto)
}