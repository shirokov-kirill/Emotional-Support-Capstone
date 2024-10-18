package org.example.appbackend.repository

import org.example.appbackend.entity.UserMood
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface UserMoodRepository : CrudRepository<UserMood, Int> {
   fun findByUserIdAndCreatedBetween(userId: Int, startDate: LocalDateTime, endDate: LocalDateTime): List<UserMood>
   @Query("""
      SELECT um 
        FROM UserMood um 
        JOIN UserMoodSharing ums ON um.userId = ums.userId
        AND um.userId = :userId
        WHERE ums.doctorId = :doctorId
         AND um.created BETWEEN ums.startDate AND ums.endDate
   """)
   fun findByUserIdAndDoctorId(userId: Int, doctorId: Int): List<UserMood>

   @Query("""
      SELECT um 
        FROM UserMood um 
        JOIN UserMoodSharing ums ON um.userId = ums.userId
        WHERE ums.doctorId = :doctorId
         AND um.created BETWEEN ums.startDate AND ums.endDate
   """)
   fun findByDoctorId(doctorId: Int): List<UserMood>
}
