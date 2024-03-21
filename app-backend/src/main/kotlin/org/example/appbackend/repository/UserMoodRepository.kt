package org.example.appbackend.repository

import org.example.appbackend.entity.UserMood
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface UserMoodRepository : CrudRepository<UserMood, Int> {
   fun findByUserIdAndCreatedBetween(userId: Int, startDate: LocalDateTime, endDate: LocalDateTime): List<UserMood>
}