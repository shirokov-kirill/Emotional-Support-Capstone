package org.example.appbackend.repository

import org.example.appbackend.entity.User
import org.example.appbackend.entity.UserLogin
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserLoginRepository : JpaRepository<UserLogin, Int>{
    fun findByUser(user: User): List<UserLogin>
}