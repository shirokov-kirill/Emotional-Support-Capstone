package org.example.appbackend.controller

import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.service.DoctorCredentialsService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterDoctorController(
    private val doctorCredentialsService: DoctorCredentialsService,
) {
    private var logger = LoggerFactory.getLogger(RegisterDoctorController::class.java)

    @PostMapping("doctor/register")
    fun registerDoctor(@RequestBody dto: RegisterDoctorCredentialsDto) {
        logger.info("Register {}", dto)
        doctorCredentialsService.register(dto)
    }
}
