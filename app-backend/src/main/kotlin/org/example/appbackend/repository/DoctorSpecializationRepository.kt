package org.example.appbackend.repository

import org.example.appbackend.entity.DoctorSpecialization
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DoctorSpecializationRepository : CrudRepository<DoctorSpecialization, Int> {
   
   // Retrieves all specializations for a given doctor
   fun findByDoctorId(doctorId: Int): List<DoctorSpecialization>

   // Retrieves doctors who specialize in a specific area
   @Query("""
      SELECT ds 
        FROM DoctorSpecialization ds 
       WHERE ds.specialization = :specialization
   """)
   fun findDoctorsBySpecialization(specialization: String): List<DoctorSpecialization>
}
