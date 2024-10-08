package org.example.appbackend.service

import org.example.appbackend.dto.UserDto
import org.example.appbackend.dto.CreateUserDto
import org.example.appbackend.entity.User
import org.example.appbackend.mapper.UserMapper
import org.example.appbackend.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.authentication.BadCredentialsException
import java.time.LocalDateTime
import org.slf4j.LoggerFactory

@Service
class UserServiceImpl(
        private val userRepository: UserRepository,
        private val userMapper: UserMapper
) : UserService {

    private val passwordEncoder = BCryptPasswordEncoder()
    private var logger = LoggerFactory.getLogger(UserServiceImpl::class.java)

    override fun createUser(userDto: CreateUserDto): UserDto {
        // Check if a user with the same username already exists
        logger.info("Create user: {}", userDto.username)
        val existingUser = userRepository.findByUsername(userDto.username)
        if (existingUser != null) {
            logger.info("User with such username already exists: {}", existingUser.username)
            return userMapper.entityToDto(existingUser)
        }

        val hashedPassword = hashPassword(userDto.password)

        var user = userMapper.createDtoToEntity(userDto)
        user.password = hashedPassword
        user.createdAt = LocalDateTime.now()
        val savedUser = userRepository.save(user)
        return userMapper.entityToDto(savedUser)
    }

    override fun getUserById(userId: Int): UserDto {
        val user = userRepository.findById(userId).orElseThrow { IllegalArgumentException("User not found with id: $userId") }
        return userMapper.entityToDto(user)
    }

    override fun getUserByUsername(username: String): UserDto {
        val user = userRepository.findByUsername(username) ?: throw IllegalArgumentException("User not found with username: $username")
        return userMapper.entityToDto(user)
    }

    override fun authenticateUser(username: String, password: String): UserDto {
        try {
            // Load user details by username
            logger.info("Authenticate user: $username")
            val user = userRepository.findByUsername(username)

            // Check if the provided password matches the stored password
            if (user == null || !passwordEncoder.matches(password, user.password)) {
                throw BadCredentialsException("Invalid username or password")
            }
            return userMapper.entityToDto(user)
        } catch (ex: Exception) {
            logger.error("Error authenticating user: {}", ex.message)
            throw ex
        }
    }

    override fun updatePassword(username: String, password: String): UserDto {
        val user = userRepository.findByUsername(username) ?:
            throw IllegalArgumentException("User not found with username: $username")
        user.password = hashPassword(password)
        userRepository.save(user)

        return userMapper.entityToDto(user)
    }

    private fun hashPassword(password: String): String {
        return password.let { passwordEncoder.encode(it) }
    }
}
