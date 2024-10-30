package org.example.appbackend.repository

import org.example.appbackend.entity.DoctorCredentials
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DoctorCredentialsRepository : CrudRepository<DoctorCredentials, Int> {
    fun findByUsername(username: String): DoctorCredentials?
}

