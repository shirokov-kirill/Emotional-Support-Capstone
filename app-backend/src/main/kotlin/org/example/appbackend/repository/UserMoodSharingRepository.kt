package org.example.appbackend.repository

import org.example.appbackend.dto.UserProjection
import org.example.appbackend.entity.UserMoodSharing
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.example.appbackend.entity.User

interface UserMoodSharingRepository : CrudRepository<UserMoodSharing, Int> {
    @Query("""
      SELECT DISTINCT u
        FROM UserMoodSharing ums
        JOIN User u ON ums.userId = u.id
        WHERE ums.doctorId = :doctorId
   """)
    fun findUsersByDoctorId(doctorId: Int): List<User>
}
