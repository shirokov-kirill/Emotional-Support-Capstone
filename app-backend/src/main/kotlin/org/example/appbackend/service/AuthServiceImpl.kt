package org.example.appbackend.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.example.appbackend.entity.AuthToken
import org.example.appbackend.repository.AuthTokenRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthServiceImpl(
    private val authTokenRepository: AuthTokenRepository
) : AuthService {

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String

    override fun createToken(userId: Int): String {
        val authToken = generateAuthToken(userId)
        // Store token in the repository
        return authTokenRepository.save(AuthToken(authToken, userId)).token
    }

    private fun generateAuthToken(userId: Int): String {
        val expirationTime = Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME_MS)
        val keyBytes = jwtSecret.toByteArray(Charsets.UTF_8) // Correct encoding to Byte array
        val key = Keys.hmacShaKeyFor(keyBytes)

        return Jwts.builder()
            .setSubject(userId.toString())
            .setExpiration(expirationTime)
            .signWith(key)
            .compact()
    }

    override fun deleteToken(token: String) {
        if (authTokenRepository.existsById(token)) {
            authTokenRepository.deleteByToken(token)
        }
    }

    companion object {
        const val JWT_EXPIRATION_TIME_MS: Long = 864_000_000 // 10 days
    }
}