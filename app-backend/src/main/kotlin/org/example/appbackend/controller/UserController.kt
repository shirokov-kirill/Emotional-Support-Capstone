package org.example.appbackend.controller

import org.springframework.web.bind.annotation.*
import org.example.appbackend.dto.UserDto
import org.example.appbackend.dto.CreateUserDto
import org.example.appbackend.service.UserService

@RestController
@RequestMapping("/users")
class UserController(
        private val userService: UserService
) {
    @PostMapping
    fun createUser(@RequestBody dto: CreateUserDto): UserDto {
        return userService.createUser(dto)
    }

    @GetMapping("/{username}")
    fun getUserByUsername(@PathVariable username: String): UserDto? {
        return userService.getUserByUsername(username)
    }
}