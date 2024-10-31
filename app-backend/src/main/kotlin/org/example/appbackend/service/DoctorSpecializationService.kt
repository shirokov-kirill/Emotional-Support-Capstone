package org.example.appbackend.service

import org.example.appbackend.dto.CreateDoctorSpecializationDto
import org.example.appbackend.dto.DoctorSpecializationDto

interface DoctorSpecializationService {

    fun create(dto: CreateDoctorSpecializationDto): DoctorSpecializationDto
    fun get(id: Int): DoctorSpecializationDto
    fun getByDoctorId(doctorId: Int): List<DoctorSpecializationDto>
    fun getDoctorsBySpecialization(specialization: String): List<DoctorSpecializationDto>
    fun delete(id: Int)
}
