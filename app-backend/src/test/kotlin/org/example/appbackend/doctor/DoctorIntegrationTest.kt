package org.example.appbackend.doctor

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.Url
import org.example.appbackend.createDoctor
import org.example.appbackend.registerDoctorCredentials
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class DoctorIntegrationTest {

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    private val port: Int = 0
    private val url get() = Url(port)

    @Test
    fun `test doctor registration`() {
        val doctorId = createDoctor(url, restTemplate, username = "doctorUser", name = "John", surname = "Doe", email = "doctor@example.com")
        assertEquals(doctorId, doctorId)
    }

    @Test
    fun `test doctor credentials registration`() {
        registerDoctorCredentials(
            url,
            restTemplate,
            username = "newDoctor",
            password = "password123",
            firstName = "Jane",
            lastName = "Smith",
            email = "jane@example.com"
        )
    }
}