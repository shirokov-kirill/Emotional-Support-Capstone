package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.mapper.DoctorCredentialsMapper
import org.example.appbackend.repository.DoctorCredentialsRepository
import org.springframework.stereotype.Service

@Service
class DoctorCredentialsServiceImpl(
    private val doctorCredentialsRepository: DoctorCredentialsRepository,
    private val doctorCredentialsMapper: DoctorCredentialsMapper
) : DoctorCredentialsService {

    override fun register(dto: RegisterDoctorCredentialsDto): DoctorCredentialsDto {
        val doctorCredentials = doctorCredentialsMapper.registerDtoToEntity(dto)
        val credentials = doctorCredentialsRepository.save(doctorCredentials)

        return doctorCredentialsMapper.entityToDto(credentials)
    }
}
