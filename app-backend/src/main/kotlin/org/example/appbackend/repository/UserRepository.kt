package org.example.appbackend.repository

import org.example.appbackend.entity.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

interface UserRepository : CrudRepository<User, Int> {
    fun findByUsername(username: String): User?
}