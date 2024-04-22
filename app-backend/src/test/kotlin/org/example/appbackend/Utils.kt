package org.example.appbackend

import org.example.appbackend.dto.DoctorCredentialsDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import kotlin.test.assertNotNull

class Url(val port: Int) {
    val root get() = "http://localhost:$port"
    val addDoctor get() = "$root/doctor/register"
    val addChat get() = "$root/chats"
    val addMessage get() = "$root/messages"
    fun getChatsByUser(userId: Int) = "$root/chats/user/$userId"
    fun getChatsByDoctor(doctorId: Int) = "$root/chats/doctor/$doctorId"
    fun getMessagesByChat(chatId: Int) = "$root/messages/$chatId"
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
