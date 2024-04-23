package org.example.appbackend.service

import org.example.appbackend.dto.CreateUserMoodDto
import org.example.appbackend.dto.UpdateUserMoodDto
import org.example.appbackend.dto.UserMoodDto
import java.time.LocalDate

interface UserMoodService {

    fun create(dto: CreateUserMoodDto): UserMoodDto
    fun get(id: Int): UserMoodDto
    fun update(dto: UpdateUserMoodDto): UserMoodDto
    fun getUserMoodForTimeFrame(userId: Int, startDate: LocalDate, endDate: LocalDate): Map<LocalDate, UserMoodDto>
    fun getCriticalUsersMoodByDoctorId(doctorId: Int): List<UserMoodDto>
    fun delete(id: Int)

    companion object {

        fun isMoodCritical(userMoodDto: UserMoodDto): Boolean =
            CRITICAL_NEGATIVE_MOOD_EMOJI.contains(userMoodDto.emoji) || userMoodDto.color == BLACK_COLOUR

        private val CRITICAL_NEGATIVE_MOOD_EMOJI = arrayOf(
            "\uD83D\uDE21",  // 😡
            "\uD83E\uDD2C",  // 🤬
            "\uD83E\uDD2E",  // 🤮
            "\uD83E\uDD21",  // 🤡
            "\uD83D\uDE2B",  // 😫
            "\uD83D\uDE29",  // 😩
            "\uD83D\uDE2D"   // 😭
        )

        private const val BLACK_COLOUR = "#000000"
    }
}
