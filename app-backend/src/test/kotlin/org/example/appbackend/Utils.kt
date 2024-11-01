package org.example.appbackend

import org.example.appbackend.dto.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import kotlin.random.Random
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
    fun getAllowedUserMood(userId: Int, doctorId: Int) = "$root/user-mood/get-allowed/$userId/$doctorId"
    fun getUserMoodTimeFrame(start: LocalDate, end: LocalDate) =
        "$root/user-mood/getByUser/timeframe?start=$start&end=$end"
}

fun createDoctor(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String = "default_username",
    name: String? = null,
    surname: String? = null,
    email: String? = null,
    clinic: String = "default_clinic",
    specialization: String = "default_specialization",
): Int {
    val id = 123
    val dob = LocalDate.of(1990, 1, 1)
    val doctorCredentials = RegisterDoctorCredentialsDto(username, "password", name, surname, email, dob, clinic, specialization)
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
