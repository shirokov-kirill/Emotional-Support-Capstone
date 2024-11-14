package org.example.appbackend.controller

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.service.DoctorCredentialsService
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterDoctorController(
    private val doctorCredentialsService: DoctorCredentialsService,
) {
    private var logger = LoggerFactory.getLogger(RegisterDoctorController::class.java)

    @PostMapping("doctor/register")
    fun registerDoctor(@RequestBody dto: RegisterDoctorCredentialsDto): DoctorCredentialsDto {
        logger.info("Register {}", dto)
        return doctorCredentialsService.register(dto)
    }

    @GetMapping("doctor")
    fun getDoctorByID(authentication: Authentication):
            DoctorCredentialsDto? {
        // Access check. To be moved to separate service later when implement share access with doctors feature.
        val doctorPrincipal = authentication.principal as DoctorCredentialsDto
        val authenticatedUserId = doctorPrincipal.id

        return doctorCredentialsService.getDoctorById(authenticatedUserId)
    }
}
