package org.example.appbackend.service

import jakarta.transaction.Transactional
import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.entity.UserMood
import org.example.appbackend.exception.UserMoodIdNotAssignedException
import org.example.appbackend.exception.UserMoodNotFoundException
import org.example.appbackend.mapper.UserMoodMapper
import org.example.appbackend.repository.UserMoodRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class UserMoodServiceImpl(
    private val userMoodRepository: UserMoodRepository,
    private val userMoodMapper: UserMoodMapper
) : UserMoodService {

    @Transactional
    override fun create(dto: CreateUserMoodDto): UserMoodDto {
        val mood = createMoodByDto(dto)
        val savedMood = userMoodRepository.save(mood)
        return userMoodMapper.entityToDto(savedMood)
    }

    private fun createMoodByDto(dto: CreateUserMoodDto): UserMood {
        val mood = userMoodMapper.createDtoToEntity(dto)
        mood.created = LocalDateTime.now()
        mood.updated = LocalDateTime.now()
        return mood
    }

    @Transactional
    override fun get(id: Int): UserMoodDto {
        val moodOpt = userMoodRepository.findById(id)

        if (moodOpt.isEmpty) {
            throw UserMoodNotFoundException(id)
        }
        return userMoodMapper.entityToDto(moodOpt.get())
    }

    @Transactional
    override fun update(dto: UpdateUserMoodDto): UserMoodDto {
        if (dto.id == null) {
            throw UserMoodIdNotAssignedException()
        }
        val moodOpt = userMoodRepository.findById(dto.id)
        if (moodOpt.isEmpty) {
            throw UserMoodNotFoundException(dto.id)
        }
        val updatedMood = updateMoodByDto(moodOpt.get(), dto)
        return userMoodMapper.entityToDto(updatedMood)
    }

    private fun updateMoodByDto(mood: UserMood, dto: UpdateUserMoodDto): UserMood {
        mood.color = dto.color
        mood.emoji = dto.emoji
        mood.description = dto.description
        mood.userID = dto.userID
        mood.updated = LocalDateTime.now()
        return mood
    }

    @Transactional
    override fun delete(id: Int) = userMoodRepository.deleteById(id)
}