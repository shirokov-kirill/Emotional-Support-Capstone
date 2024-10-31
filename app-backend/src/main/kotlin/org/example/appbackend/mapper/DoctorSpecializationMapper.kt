package org.example.appbackend.mapper

import org.example.appbackend.dto.CreateDoctorSpecializationDto
import org.example.appbackend.dto.DoctorSpecializationDto
import org.example.appbackend.entity.DoctorSpecialization
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface DoctorSpecializationMapper {

    fun dtoToEntity(doctorSpecializationDto: DoctorSpecializationDto): DoctorSpecialization
    fun entityToDto(doctorSpecialization: DoctorSpecialization): DoctorSpecializationDto
    fun createDtoToEntity(createDoctorSpecializationDto: CreateDoctorSpecializationDto): DoctorSpecialization
}
