package org.example.appbackend.mapper

import org.example.appbackend.dto.SharedDoctorCredentialsDto
import org.example.appbackend.entity.DoctorCredentials

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings

@Mapper(componentModel = "spring")
interface SharedDoctorCredentialsMapper {
    @Mappings(
        Mapping(source = "id", target = "doctorId"),
        Mapping(source = "firstName", target = "firstName"),
        Mapping(source = "lastName", target = "lastName")
    )
    fun entityToDto(doctorCredentials: DoctorCredentials): SharedDoctorCredentialsDto
}
