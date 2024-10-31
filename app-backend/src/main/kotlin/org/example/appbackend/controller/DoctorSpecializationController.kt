package org.example.appbackend.controller

import org.example.appbackend.dto.CreateDoctorSpecializationDto
import org.example.appbackend.dto.DoctorSpecializationDto
import org.example.appbackend.service.DoctorSpecializationService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*

@RestController
class DoctorSpecializationController(
    private val doctorSpecializationService: DoctorSpecializationService,
) {
    private var logger = LoggerFactory.getLogger(DoctorSpecializationController::class.java)

    // Endpoint for doctors to create their specialization
    @PostMapping("doctor-specialization/create")
    fun createDoctorSpecialization(@RequestBody dto: CreateDoctorSpecializationDto): DoctorSpecializationDto {
        logger.info("Creating doctor specialization {}", dto)
        return doctorSpecializationService.create(dto)
    }

    // Endpoint for retrieving a specialization by ID
    @GetMapping("doctor-specialization/get/{id}")
    fun getDoctorSpecialization(@PathVariable("id") id: Int): DoctorSpecializationDto {
        logger.info("Retrieving doctor specialization by id: {}", id)
        return doctorSpecializationService.get(id)
    }

    // Endpoint to retrieve all specializations of a particular doctor
    @GetMapping("doctor-specialization/getByDoctor/{doctorId}")
    fun getSpecializationsByDoctorId(@PathVariable("doctorId") doctorId: Int): List<DoctorSpecializationDto> {
        logger.info("Retrieving specializations for doctor with ID: {}", doctorId)
        return doctorSpecializationService.getByDoctorId(doctorId)
    }

    // Endpoint to retrieve specializations based on specialization type
    @GetMapping("doctor-specialization/getBySpecialization")
    fun getDoctorsBySpecialization(@RequestParam("specialization") specialization: String): List<DoctorSpecializationDto> {
        logger.info("Retrieving doctors by specialization: {}", specialization)
        return doctorSpecializationService.getDoctorsBySpecialization(specialization)
    }

    // Endpoint for deleting a specialization by ID
    @DeleteMapping("doctor-specialization/delete/{id}")
    fun deleteDoctorSpecialization(@PathVariable("id") id: Int) {
        logger.info("Deleting doctor specialization with id: {}", id)
        doctorSpecializationService.delete(id)
    }
}
