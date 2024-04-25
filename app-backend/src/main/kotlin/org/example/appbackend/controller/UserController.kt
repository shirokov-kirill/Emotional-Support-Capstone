package org.example.appbackend.controller

import org.springframework.web.bind.annotation.*
import org.example.appbackend.dto.UserDto
import org.example.appbackend.dto.CreateUserDto
import org.example.appbackend.dto.UpdatePasswordDto
import org.example.appbackend.service.UserService
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.slf4j.LoggerFactory
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/users")
class UserController(
        private val userService: UserService
) {
    private var logger = LoggerFactory.getLogger(UserController::class.java)

    @PostMapping
    fun createUser(@RequestBody dto: CreateUserDto): UserDto {
        return userService.createUser(dto)
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Int, authentication: Authentication): UserDto? {
        // Access check. To be moved to separate service later when implement share access with doctors feature.
        val userPrincipal = authentication.principal as UserDto
        val authenticatedUserId = userPrincipal.id
        if (authenticatedUserId != id) {
            logger.info("/users/${id} cannot be accessed by $authenticatedUserId")
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized")
        }

        // If the IDs match, retrieve the user from the database using the UserService
        return userService.getUserById(id)
    }

    @PostMapping("/password/update")
    fun updatePassword(@RequestBody dto: UpdatePasswordDto) {
        logger.info("Trying to update password for ${dto.username}")
        userService.updatePassword(dto.username, dto.password)
    }
}