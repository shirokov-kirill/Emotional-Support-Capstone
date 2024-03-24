package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto


interface DoctorCredentialsService {
    fun register(dto: RegisterDoctorCredentialsDto): DoctorCredentialsDto
}
