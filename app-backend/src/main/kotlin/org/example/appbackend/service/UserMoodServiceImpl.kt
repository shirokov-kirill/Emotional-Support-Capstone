package org.example.appbackend.service

import jakarta.transaction.Transactional
import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import org.example.appbackend.entity.UserMood
import org.example.appbackend.exception.UserMoodIdNotAssignedException
import org.example.appbackend.exception.UserMoodNotFoundException
import org.example.appbackend.mapper.ChatMapper
import org.example.appbackend.mapper.UserMoodMapper
import org.example.appbackend.repository.ChatRepository
import org.example.appbackend.repository.UserMoodRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.LocalDateTime

/**
 * Implementation of the UserMoodService interface.
 *
 * @property userMoodRepository The repository for accessing user mood data.
 * @property chatRepository The repository for accessing binding between doctor and user
 * @property userMoodMapper The mapper for converting between UserMood and UserMoodDto objects.
 */
@Service
class UserMoodServiceImpl(
    private val userMoodRepository: UserMoodRepository,
    private val chatRepository: ChatRepository,
    private val userMoodMapper: UserMoodMapper,
    private val chatMapper: ChatMapper
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
    override fun getUserMoodForTimeFrame(userId: Int, startDate: LocalDate, endDate: LocalDate): Map<LocalDate, UserMoodDto> {
        val startLocalDateTime = startDate.atStartOfDay()
        val endLocalDateTime = endDate.atStartOfDay()
        val userMoodData = userMoodRepository.findByUserIdAndCreatedBetween(userId, startLocalDateTime, endLocalDateTime)
        return userMoodData.mapNotNull {
            it.created?.let {
                date -> date.toLocalDate() to userMoodMapper.entityToDto(it)
            }
        }.toMap()
    }


    /**
     * Retrieves a map of user IDs to UserMoodDto objects representing the mood of users
     * who have had chats with a specific doctor.
     *
     * @param doctorId The ID of the doctor.
     * @return A map of user IDs to UserMoodDto objects.
     */
    @Transactional
    override fun getCriticalUsersMoodByDoctorId(doctorId: Int): Map<Int, UserMoodDto> {
        val doctorChats = chatRepository.findByDoctorId(doctorId)
        val userIdToMoodDto = mutableMapOf<Int, UserMoodDto>()
        val today = LocalDateTime.now().toLocalDate().atStartOfDay()
        val tomorrow = today.plusDays(1)
        for (doctorChat in doctorChats) {
            val chatDto = chatMapper.entityToDto(doctorChat)
            val userMoods = userMoodRepository.findByUserIdAndCreatedBetween(chatDto.userId, today, tomorrow).map {
                userMoodMapper.entityToDto(it)
            }
            if (userMoods.isNotEmpty()) {
                val userMood = userMoods[0]
                if (UserMoodService.isMoodCritical(userMood)) {
                    userMood.userId?.let {
                        userIdToMoodDto[it] = userMood
                    }
                }
            }
        }
        return userIdToMoodDto
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
        mood.updated = LocalDateTime.now()
        return mood
    }

    @Transactional
    override fun delete(id: Int) = userMoodRepository.deleteById(id)
}