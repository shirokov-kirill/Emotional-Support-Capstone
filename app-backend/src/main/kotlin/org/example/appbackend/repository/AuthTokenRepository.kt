package org.example.appbackend.repository

import org.springframework.data.repository.CrudRepository
import org.example.appbackend.entity.AuthToken
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface AuthTokenRepository : CrudRepository<AuthToken, String> {
    fun findByToken(token: String): AuthToken?

    @Transactional
    fun deleteByToken(token: String)
}