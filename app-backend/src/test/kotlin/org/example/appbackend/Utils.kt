package org.example.appbackend

import org.example.appbackend.dto.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import kotlin.test.assertNotNull

class Url(val port: Int) {
    val root get() = "http://localhost:$port"
    val addDoctor get() = "$root/doctor/register"
    val addUser get() = "$root/users"
    val login get() = "$root/auth/login"
    val addChat get() = "$root/chats"
    val addMessage get() = "$root/messages"
    fun getChatsByUser(userId: Int) = "$root/chats/user/$userId"
    fun getChatsByDoctor(doctorId: Int) = "$root/chats/doctor/$doctorId"
    fun getMessagesByChat(chatId: Int) = "$root/messages/$chatId"
    val shareUserMood = "$root/user-mood/share"
    val createMood get() = "$root/user-mood/create"
    val updateUserMood get() = "$root/user-mood/update"
    val updatePassword get() = "$root/password/update"
    val registerDoctorCredentials get() = "$root/doctor/register"
    fun getAllowedUserMood(userId: Int, doctorId: Int) = "$root/user-mood/get-allowed/$userId/$doctorId"
}

fun createDoctor(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String? = null,
    name: String? = null,
    surname: String? = null,
    email: String? = null,
    clinic: String? = null,
    specialization: String? = null,
): Int {
    val doctorCredentials = DoctorCredentialsDto(null, null, username, name, surname, email, clinic, specialization)
    val response = restTemplate.postForEntity(url.addDoctor, doctorCredentials, DoctorCredentialsDto::class.java)
    assertEquals(HttpStatus.OK, response.statusCode)
    val createdDoctorCredentials = response.body
    assertNotNull(createdDoctorCredentials)
    val doctorId = createdDoctorCredentials.id
    assertNotNull(doctorId)
    return doctorId
}

fun createUser(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String,
    password: String,
    firstName: String? = null,
    lastName: String? = null,
    email: String,
    dateOfBirth: LocalDate? = null,
    gender: String? = null
): Int {
    // Create a user
    val userCredentials = CreateUserDto(username, password, firstName, lastName, email, dateOfBirth, gender)
    val response = restTemplate.postForEntity(url.addUser, userCredentials, UserDto::class.java)
    assertEquals(HttpStatus.OK, response.statusCode)
    val userId = response.body!!.id
    assertNotNull(userId)
    return userId
}

fun loginUser(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String,
    password: String
): String {
    // Login and obtain the token
    val loginRequest = LoginRequestDto(username, password)
    val loginResponse = restTemplate.postForEntity(url.login, loginRequest, LoginResponseDto::class.java)
    assertEquals(HttpStatus.OK, loginResponse.statusCode)
    assertNotNull(loginResponse.body)
    return loginResponse.body!!.token
}

fun updatePassword(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String,
    password: String
) {
    val updatePasswordRequest = UpdatePasswordDto(username, password)
    val updatePasswordResponse = restTemplate.postForEntity(url.updatePassword, updatePasswordRequest, UpdatePasswordDto::class.java)
    assertEquals(HttpStatus.OK, updatePasswordResponse.statusCode)
}

fun updateUserMoodDto(
    url: Url,
    restTemplate: TestRestTemplate,
    id: Int? = null,
    color: String? = null,
    emoji: String? = null,
    description: String? = null
): Int {
    val updateUserRequest = UpdateUserMoodDto(id, color, emoji, description)
    val updateUserResponse = restTemplate.postForEntity(url.updateUserMood, updateUserRequest, UpdateUserMoodDto::class.java)
    assertEquals(HttpStatus.OK, updateUserResponse.statusCode)
    assertNotNull(updateUserResponse.body)
    assertNotNull(updateUserResponse.body!!.id)
    return updateUserResponse.body!!.id!!
}

fun registerDoctorCredentials(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String? = null,
    password: String? = null,
    firstName: String? = null,
    lastName: String? = null,
    email: String? = null,
    dateOfBirth: LocalDate? = null
) {
    val registerDoctorRequest = RegisterDoctorCredentialsDto(username, password, firstName, lastName, email, dateOfBirth)
    val registerDoctorResponse = restTemplate.postForEntity(url.registerDoctorCredentials, registerDoctorRequest, RegisterDoctorCredentialsDto::class.java)
    assertEquals(HttpStatus.OK, registerDoctorResponse.statusCode)
    assertNotNull(registerDoctorResponse.body)
}

