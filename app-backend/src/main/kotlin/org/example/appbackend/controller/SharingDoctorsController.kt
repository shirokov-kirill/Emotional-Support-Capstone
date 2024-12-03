package org.example.appbackend.controller

import org.example.appbackend.dto.SharedDoctorCredentialsDto
import org.example.appbackend.service.SharingDoctorsCredentialsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

@RestController
class SharingDoctorsController (
    private val sharingDoctorsCredentialsService: SharingDoctorsCredentialsService,
) {

    @GetMapping("doctors")
    fun getDoctors(@RequestHeader("Authorization") authToken: String): List<SharedDoctorCredentialsDto> {
        return sharingDoctorsCredentialsService.getAllDoctors()
    }
}