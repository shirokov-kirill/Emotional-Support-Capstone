package org.example.appbackend.service

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.exception.UserMoodIdNotAssignedException
import org.example.appbackend.exception.UserMoodNotFoundException
import org.example.appbackend.mapper.UserMoodMapper
import org.example.appbackend.repository.UserMoodRepository
import org.springframework.stereotype.Service

@Service
class UserMoodServiceImpl(
    private val userMoodRepository: UserMoodRepository,
    private val userMoodMapper: UserMoodMapper
) : UserMoodService {

    override fun create(dto: CreateUserMoodDto): UserMoodDto {
        val mood = userMoodMapper.createDtoToEntity(dto)
        val savedMood = userMoodRepository.save(mood)
        return userMoodMapper.entityToDto(savedMood)
    }

    override fun get(id: Int): UserMoodDto {
        val moodOpt = userMoodRepository.findById(id)

        if (moodOpt.isEmpty) {
            throw UserMoodNotFoundException(id)
        }
        return userMoodMapper.entityToDto(moodOpt.get())
    }

    override fun update(dto: UserMoodDto): UserMoodDto {
        if (dto.id == null) {
            throw UserMoodIdNotAssignedException()
        }
        if (!userMoodRepository.existsById(dto.id)) {
            throw UserMoodNotFoundException(dto.id)
        }
        val mood = userMoodMapper.dtoToEntity(dto)
        val savedMood = userMoodRepository.save(mood)
        return userMoodMapper.entityToDto(savedMood)
    }

    override fun delete(id: Int) = userMoodRepository.deleteById(id)
}