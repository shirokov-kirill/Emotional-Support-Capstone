package org.example.appbackend.dto

import java.time.LocalDateTime

data class ShareMoodTimeFrameWithDoctorsDto(
    val userId: Int,
    val doctorsIds: List<Int>,
    val timeFrameStart: LocalDateTime,
    val timeFrameEnd: LocalDateTime,
)

data class UserMoodSharingDto(
    val userId: Int,
    val doctorId: Int,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
)
