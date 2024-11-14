package org.example.appbackend.service

import org.example.appbackend.dto.*
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.bodyToMono

@Service
class PythonCommunicatorServiceImpl: PythonCommunicatorService {

    private val webClient = WebClient.builder()
        .baseUrl(PYTHON_SERVICE_ADDRESS)
        .build()

    override fun getRelevantDoctors(
        userMoods: List<UserMoodDto>,
        doctors: List<DoctorCredentialsDto>
    ): List<DoctorRecommendationDto> {
        val emoji = userMoods.mapNotNull { it.emoji }
        val doctorIdAndSpecialisations = doctors.map { Pair(it.id, it.specialisation ?: "") }

        val requestPayload = PythonRelevantDoctorRequestDto(
            emoji = emoji,
            doctorIdAndSpecialisation = doctorIdAndSpecialisations
        )

        val relevantDoctorSortedList = webClient.post()
            .uri("/get-relevant-ads")
            .bodyValue(requestPayload)
            .retrieve()
            .bodyToMono<PythonRelevantDoctorResponseDto>()
            .block()
        val idToDoctorRecommendationDto = doctors.map {
            it.id to DoctorRecommendationDto(it.firstName, it.lastName, it.email, it.specialisation)
        }.associate { it }

        return relevantDoctorSortedList?.relevantDoctorIdSorted?.map {
            doctorId -> idToDoctorRecommendationDto[doctorId]
        }?.filterNotNull() ?: emptyList()

    }

    companion object {
        private const val PYTHON_SERVICE_ADDRESS = "http://127.0.0.1:5000"
    }
}