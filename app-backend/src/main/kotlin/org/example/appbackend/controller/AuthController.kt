package org.example.appbackend.controller

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.example.appbackend.dto.LoginRequestDto
import org.example.appbackend.dto.LoginResponseDto
import org.example.appbackend.entity.AuthToken
import org.example.appbackend.repository.AuthTokenRepository
import org.example.appbackend.service.DoctorCredentialsService
import org.example.appbackend.service.UserService
import org.example.appbackend.utils.executePythonScript
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/auth")
class AuthController(
    private val userService: UserService,
    private val doctorService: DoctorCredentialsService,
    private val authTokenRepository: AuthTokenRepository
) {

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String
    private var logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequestDto): ResponseEntity<Any> {
        try {
            // Perform authentication
            val userDto = userService.authenticateUser(loginRequest.username, loginRequest.password)
            logger.info("Logging in ${loginRequest.username}. Credentials match.")
            // If authentication succeeds, generate an authentication token (JWT) with user ID
            val authToken = generateAuthToken(userDto.id)
            // Return the authentication token in the response
            val responseDto = LoginResponseDto(authToken)
            // Store token in the repository
            authTokenRepository.save(AuthToken(authToken, userDto.id))
            logger.info("Logged in successfully.")

            try {
                executePythonScript(userDto.email, userDto.username)
            } catch (e: Exception) {
                logger.error("Failed sending Email: ${e.message}")
            }

            return ResponseEntity(responseDto, HttpStatus.OK)
        } catch (e: Exception) {
            // Return 401 Unauthorized status code if authentication fails
            logger.error("Error authenticating user: {}", e.message)
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }

    @PostMapping("/doctor-login")
    fun doctorLogin(@RequestBody loginRequest: LoginRequestDto): ResponseEntity<Any> {
        try {
            // Perform authentication
            val doctorDto = doctorService.authenticateUser(loginRequest.username, loginRequest.password)
            logger.info("Logging in ${loginRequest.username}. Credentials match.")
            // If authentication succeeds, generate an authentication token (JWT) with user ID
            val authToken = generateAuthToken(doctorDto.id)
            // Return the authentication token in the response
            val responseDto = LoginResponseDto(authToken)
            // Store token in the repository
            authTokenRepository.save(AuthToken(authToken, doctorDto.id))
            logger.info("Logged in successfully.")
            return ResponseEntity(responseDto, HttpStatus.OK)
        } catch (e: Exception) {
            // Return 401 Unauthorized status code if authentication fails
            logger.error("Error authenticating doctor: {}", e.message)
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }

    @PostMapping("/logout")
    fun logout(request: HttpServletRequest): ResponseEntity<Any> {
        val token = request.getHeader("Authorization")?.substring(7)
        if (token != null && authTokenRepository.existsById(token)) {
            authTokenRepository.deleteByToken(token)
        }
        SecurityContextHolder.clearContext()
        return ResponseEntity("Logged out successfully.", HttpStatus.OK)
    }

    @PostMapping("/endAllOtherSessions")
    fun endAllOtherSessions(request: HttpServletRequest): ResponseEntity<Any> {
        val requestToken = request.getHeader("Authorization")?.substring(7)
            ?: throw IllegalArgumentException("Invalid JWT token.")
        val currentToken = authTokenRepository.findByToken(requestToken)
        if (currentToken != null ) {
            val tokens =
                authTokenRepository.findAll().filter { it.userId == userService.getUserById(currentToken.userId).id }
            for (token in tokens) 
                if (token.token != currentToken.token)
                    authTokenRepository.deleteByToken(token.token)
            
        }
        SecurityContextHolder.clearContext()
        return ResponseEntity("Logged out successfully.", HttpStatus.OK)
    }

    // Method to generate authentication token (JWT) with user ID
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

    companion object {
        const val JWT_EXPIRATION_TIME_MS: Long = 864_000_000 // 10 days
    }
}
