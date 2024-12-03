package org.example.appbackend.service

import org.example.appbackend.dto.SharedDoctorCredentialsDto
import org.example.appbackend.mapper.SharedDoctorCredentialsMapper
import org.example.appbackend.repository.DoctorCredentialsRepository
import org.springframework.stereotype.Service

@Service
class SharingDoctorsCredentialsServiceImpl(
    private val doctorCredentialsRepository: DoctorCredentialsRepository,
    private val sharedDoctorCredentialsMapper: SharedDoctorCredentialsMapper
): SharingDoctorsCredentialsService {
    override fun getAllDoctors(): List<SharedDoctorCredentialsDto> {
        val doctorsList = doctorCredentialsRepository.findAll()
        return doctorsList.map { sharedDoctorCredentialsMapper.entityToDto(it) }
    }
}