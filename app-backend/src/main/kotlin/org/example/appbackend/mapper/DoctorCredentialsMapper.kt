package org.example.appbackend.mapper

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.entity.DoctorCredentials

import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface DoctorCredentialsMapper {
    fun registerDtoToEntity(registerDoctorCredentialsDto: RegisterDoctorCredentialsDto): DoctorCredentials
    fun entityToDto(doctorCredentials: DoctorCredentials): DoctorCredentialsDto
}
