package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.RegisterDoctorCredentialsDto
import org.example.appbackend.mapper.DoctorCredentialsMapper
import org.example.appbackend.repository.DoctorCredentialsRepository
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class DoctorCredentialsServiceImpl(
    private val doctorCredentialsRepository: DoctorCredentialsRepository,
    private val doctorCredentialsMapper: DoctorCredentialsMapper
) : DoctorCredentialsService {

    private val passwordEncoder = BCryptPasswordEncoder()
    private var logger = LoggerFactory.getLogger(DoctorCredentialsServiceImpl::class.java)

    override fun register(dto: RegisterDoctorCredentialsDto): DoctorCredentialsDto {
        logger.info("Create user: {}", dto.username)
        val existingUser = doctorCredentialsRepository.findByUsername(dto.username)
        if (existingUser != null) {
            logger.info("User with such username already exists: {}", existingUser.username)
            return doctorCredentialsMapper.entityToDto(existingUser)
        }

        val hashedPassword = hashPassword(dto.password)

        var user = doctorCredentialsMapper.registerDtoToEntity(dto)
        user.password = hashedPassword
        val credentials = doctorCredentialsRepository.save(user)
        return doctorCredentialsMapper.entityToDto(credentials)
    }

    override fun getDoctorById(doctorId: Int): DoctorCredentialsDto {
        val doctor = doctorCredentialsRepository.findById(doctorId).orElseThrow { IllegalArgumentException("Doctor not found with id: $doctorId") }
        return doctorCredentialsMapper.entityToDto(doctor)
    }

    override fun authenticateUser(username: String, password: String): DoctorCredentialsDto {
        try {
            // Load user details by username
            logger.info("Authenticate doctor: $username")
            val user = doctorCredentialsRepository.findByUsername(username)

            // Check if the provided password matches the stored password
            if (user == null || !passwordEncoder.matches(password, user.password)) {
                throw BadCredentialsException("Invalid username or password")
            }
            return doctorCredentialsMapper.entityToDto(user)
        } catch (ex: Exception) {
            logger.error("Error authenticating user: {}", ex.message)
            throw ex
        }
    }

    private fun hashPassword(password: String): String {
        return password.let { passwordEncoder.encode(it) }
    }
}
