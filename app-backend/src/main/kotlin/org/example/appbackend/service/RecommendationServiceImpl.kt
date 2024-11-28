package org.example.appbackend.service

import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.DoctorRecommendationDto
import org.example.appbackend.dto.UserMoodDto
import org.springframework.stereotype.Service

@Service
class RecommendationServiceImpl: RecommendationService {
    override fun getRelevantDoctors(userMoods: List<UserMoodDto>, doctors: List<DoctorCredentialsDto>): List<DoctorRecommendationDto> =
        // TODO world2vec and embeddings cosine similarity
        doctors
            .sortedBy { it.specialisation?.let { specialisation ->
                var score = 0
                if (specialisation == "Depressive Disorders") {
                    score += 2 * userMoods.count { userMood -> DEPRESSION_EMOJI.contains(userMood.emoji) }
                    score += userMoods.count { userMood -> ANXIETY_EMOJI.contains(userMood.emoji) }
                }
                if (specialisation == "Anxiety Disorders") {
                    score += userMoods.count { userMood -> DEPRESSION_EMOJI.contains(userMood.emoji) }
                    score += 2 * userMoods.count { userMood -> ANXIETY_EMOJI.contains(userMood.emoji) }
                }
                if (specialisation == "PTSD") {
                    score += 3 * userMoods.count { userMood -> PTSD_EMOTIONS.contains(userMood.emoji) }
                }
                score
            } ?: 0 }
            .reversed()
            .map { doctor ->
                DoctorRecommendationDto(doctor.firstName, doctor.lastName, doctor.email, doctor.specialisation)
            }


    companion object {
        private val DEPRESSION_EMOJI = arrayOf(
            "\uD83D\uDE2D"   // 😭
        )

        private val PTSD_EMOTIONS = arrayOf(
            "\uD83D\uDE21",  // 😡
            "\uD83E\uDD2C",  // 🤬
        )

        private val ANXIETY_EMOJI = arrayOf(
            "😨",
            "😰"
        )
    }


}