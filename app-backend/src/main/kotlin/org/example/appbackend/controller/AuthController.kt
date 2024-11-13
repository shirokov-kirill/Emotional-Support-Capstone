package org.example.appbackend.controller

import jakarta.servlet.http.HttpServletRequest
import org.example.appbackend.dto.LoginRequestDto
import org.example.appbackend.dto.LoginResponseDto
import org.example.appbackend.service.AuthService
import org.example.appbackend.service.DoctorCredentialsService
import org.example.appbackend.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(
    private val userService: UserService,
    private val doctorService: DoctorCredentialsService,
    private val authService: AuthService
) {

    private var logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequestDto): ResponseEntity<Any> {
        try {
            // Perform authentication
            val userDto = userService.authenticateUser(loginRequest.username, loginRequest.password)
            logger.info("Logging in ${loginRequest.username}. Credentials match.")
            // If authentication succeeds, generate an authentication token (JWT) with user ID
            val authToken = authService.createToken(userDto.id)
            // Return the authentication token in the response
            val responseDto = LoginResponseDto(authToken)
            logger.info("Logged in successfully.")
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
            val authToken = authService.createToken(doctorDto.id)
            // Return the authentication token in the response
            val responseDto = LoginResponseDto(authToken)
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
        request.getHeader("Authorization")
            ?.substring(7)
            ?.apply { authService.deleteToken(this) }
        SecurityContextHolder.clearContext()
        return ResponseEntity("Logged out successfully.", HttpStatus.OK)
    }
}
