package org.example.appbackend

import org.example.appbackend.dto.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import java.time.LocalDate
import java.util.concurrent.atomic.AtomicInteger
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
    fun getMessagesByChat(chatId: Int) = "$root/chats/messages/$chatId"
    val shareUserMood = "$root/user-mood/share"
    val createMood get() = "$root/user-mood/create"
    val updateUserMood get() = "$root/user-mood/update"
    val updatePassword get() = "$root/password/update"
    val registerDoctorCredentials get() = "$root/doctor/register"
    fun getAllowedUserMood(authToken: String, userId: Int) = "$root/user-mood/get-allowed/$userId"
    fun getUserMoodTimeFrame(start: LocalDate, end: LocalDate) =
        "$root/user-mood/getByUser/timeframe?start=$start&end=$end"
}

interface NameProvider {
    companion object {
        val counter: AtomicInteger = TODO()
        fun getNewName(): String = ""
    }
}

class UserNameProvider : NameProvider {
    companion object {
        private val counter = AtomicInteger(0)

        fun getNewName(): String {
            return "user${counter.incrementAndGet()}"
        }
    }
}

class DoctorNameProvider : NameProvider {
    companion object {
        private val counter = AtomicInteger(0)

        fun getNewName(): String {
            return "doctor${counter.incrementAndGet()}"
        }
    }
}

fun createDoctor(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String = DoctorNameProvider.getNewName(),
    name: String = "DoctorName",
    surname: String = "DoctorSurname",
    email: String = "doctor@example.com",
    clinic: String = "default_clinic",
    specialization: String = "default_specialization",
): Int {
    val id = 123
    val dob = LocalDate.of(1990, 1, 1)
    val doctorCredentials =
        RegisterDoctorCredentialsDto(username, "password", name, surname, email, dob, clinic, specialization, false)
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
    username: String = UserNameProvider.getNewName(),
    password: String = "default_password",
    firstName: String = "FirstName",
    lastName: String = "SecondName",
    email: String = "default_email",
    dateOfBirth: LocalDate = LocalDate.of(1990, 1, 1),
    gender: String = "male",
    securityQuestion: String? = null,
    securityAnswer: String? = null,
): Int {
    // Create a user
    val userCredentials = CreateUserDto(
        username,
        password,
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        securityQuestion,
        securityAnswer
    )
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
    password: String,
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
    password: String,
) {
    val updatePasswordRequest = UpdatePasswordDto(username, password)
    val updatePasswordResponse =
        restTemplate.postForEntity(url.updatePassword, updatePasswordRequest, UpdatePasswordDto::class.java)
    assertEquals(HttpStatus.OK, updatePasswordResponse.statusCode)
}

fun updateUserMoodDto(
    url: Url,
    restTemplate: TestRestTemplate,
    id: Int? = null,
    color: String? = null,
    emoji: String? = null,
    description: String? = null,
): Int {
    val updateUserRequest = UpdateUserMoodDto(id, color, emoji, description)
    val updateUserResponse =
        restTemplate.postForEntity(url.updateUserMood, updateUserRequest, UpdateUserMoodDto::class.java)
    assertEquals(HttpStatus.OK, updateUserResponse.statusCode)
    assertNotNull(updateUserResponse.body)
    assertNotNull(updateUserResponse.body!!.id)
    return updateUserResponse.body!!.id!!
}

fun registerDoctorCredentials(
    url: Url,
    restTemplate: TestRestTemplate,
    username: String = DoctorNameProvider.getNewName(),
    password: String = "default_password",
    firstName: String? = null,
    lastName: String? = null,
    email: String? = null,
    dateOfBirth: LocalDate? = null,
    clinic: String? = null,
    specialization: String? = null,
    agreedForRecommendations: Boolean? = null,
) {
    val registerDoctorRequest = RegisterDoctorCredentialsDto(
        username,
        password,
        firstName,
        lastName,
        email,
        dateOfBirth,
        clinic,
        specialization,
        agreedForRecommendations
    )
    val registerDoctorResponse = restTemplate.postForEntity(
        url.registerDoctorCredentials,
        registerDoctorRequest,
        RegisterDoctorCredentialsDto::class.java
    )
    assertEquals(HttpStatus.OK, registerDoctorResponse.statusCode)
    assertNotNull(registerDoctorResponse.body)
}

