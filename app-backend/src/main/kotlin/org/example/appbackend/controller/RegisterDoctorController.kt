package org.example.appbackend.controller

import org.example.appbackend.config.JwtTokenFilter
import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.service.DoctorCredentialsService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterDoctorController(
    private val doctorCredentialsService: DoctorCredentialsService,
    private val jwtTokenFilter: JwtTokenFilter,
) {
    private var logger = LoggerFactory.getLogger(RegisterDoctorController::class.java)

    @PostMapping("doctor/register")
    fun registerDoctor(@RequestBody dto: RegisterDoctorCredentialsDto): DoctorCredentialsDto {
        logger.info("Register {}", dto)
        return doctorCredentialsService.register(dto)
    }

    @GetMapping("doctor")
    fun getDoctorByID(@RequestHeader("Authorization") authToken: String):
            DoctorCredentialsDto? {
        val doctorId = jwtTokenFilter.extractUserId(authToken.substring(7))

        return doctorCredentialsService.getDoctorById(doctorId)
    }
}
