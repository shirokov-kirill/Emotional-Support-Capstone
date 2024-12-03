package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.dto.SharedDoctorCredentialsDto

interface SharingDoctorsCredentialsService {
    fun getAllDoctors(): List<SharedDoctorCredentialsDto>
}
