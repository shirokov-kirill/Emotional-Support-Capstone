package org.example.appbackend.dto

import java.time.LocalDateTime

data class UserLoginsDto(
    val user: UserDto,
    val logins: List<LocalDateTime>
)
