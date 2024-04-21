package org.example.appbackend.repository

import org.example.appbackend.entity.Chat
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ChatRepository : CrudRepository<Chat, Int> {
    fun findByUserId(userId: Int): List<Chat>
    fun findByDoctorId(doctorId: Int): List<Chat>
    fun findByUserIdAndDoctorId(userId: Int, doctorId: Int): Chat?
}
