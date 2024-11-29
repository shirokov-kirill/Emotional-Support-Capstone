package org.example.appbackend.dto

data class PythonRelevantDoctorRequestDto(
    val emoji: List<String>,
    val doctorIdAndSpecialisation: List<Pair<Int, String?>>
)
