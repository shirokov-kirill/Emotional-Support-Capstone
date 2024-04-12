package org.example.appbackend.controller

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.example.appbackend.dto.LoginRequestDto
import org.example.appbackend.dto.LoginResponseDto
import org.example.appbackend.service.UserService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*
import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder

@RestController
@RequestMapping("/auth")
class AuthController(
        private val userService: UserService
    ) {

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String
    private var logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequestDto): ResponseEntity<Any> {
        try {
            logger.info("/login {}", loginRequest.username)
            logger.info("/login secret {}", jwtSecret)
            // Perform authentication
            val userDto = userService.authenticateUser(loginRequest.username, loginRequest.password)
            logger.info("/login credential matches.")
            // If authentication succeeds, generate an authentication token (JWT) with user ID
            val authToken = generateAuthToken(userDto.id)
            logger.info("/login generated token.")
            // Return the authentication token in the response
            val responseDto = LoginResponseDto(authToken)
            return ResponseEntity(responseDto, HttpStatus.OK)
        } catch (e: Exception) {
            // Return 401 Unauthorized status code if authentication fails
            logger.error("Error authenticating user: {}", e.message)
            logger.info("/login failed.")
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }

    @PostMapping("/logout")
    fun logout() {
        // Invalidate user's authentication session
        SecurityContextHolder.clearContext()
    }

    // Method to generate authentication token (JWT) with user ID
    private fun generateAuthToken(userId: Int): String {
        val expirationTime = Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME_MS)

        return Jwts.builder()
                .claim("userId", userId.toString())
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, jwtSecret.toByteArray())
                .compact()
    }

    companion object {
        const val JWT_EXPIRATION_TIME_MS: Long = 864_000_000 // 10 days
    }
}
