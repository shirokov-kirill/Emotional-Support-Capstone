package org.example.appbackend.ai

import org.example.appbackend.AppBackendApplication
import org.example.appbackend.dto.GetBreathExerciseForUserDto
import org.example.appbackend.service.AIService
import org.example.appbackend.service.UserAIService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [AppBackendApplication::class]
)
class BreathExercisesTest {
    @MockBean
    lateinit var aiService: AIService

    @Autowired
    lateinit var userAIService: UserAIService

    @Test
    fun testRequest() {
        `when`(aiService.sendRequestToAI(anyString())).thenReturn("Response")

        val request = GetBreathExerciseForUserDto(mood = "happy", userId = 228)
        val breathExerciseForUserDto = userAIService.getBreathExercise(request)

        Assertions.assertEquals(mapOf("Response" to ""), breathExerciseForUserDto.response)
    }

    @Test
    fun testParsing() {
        val aiResponse = """
            Diaphragmatic Breathing
            1. Sit or lie down in a comfortable position.
            2. Place one hand on your chest and the other on your abdomen.
            3. Inhale deeply through your nose, ensuring your abdomen rises more than your chest.
            4. Exhale slowly through your mouth.
            5. Repeat for several minutes.

            -----

            Box Breathing
            1. Sit upright in a comfortable chair.
            2. Inhale through your nose for a count of 4.
            3. Hold your breath for a count of 4.
            4. Exhale slowly through your mouth for a count of 4.
            5. Hold your breath again for a count of 4.
            6. Repeat the cycle several times.

            -----

            4-7-8 Breathing
            1. Sit or lie down in a comfortable position.
            2. Inhale quietly through your nose for 4 seconds.
            3. Hold your breath for 7 seconds.
            4. Exhale completely through your mouth for 8 seconds.
            5. Repeat for a few cycles.

            -----

            Alternate Nostril Breathing
            1. Sit comfortably with your spine straight.
            2. Close your right nostril with your right thumb.
            3. Inhale slowly through your left nostril.
            4. Close your left nostril with your right ring finger.
            5. Open and exhale slowly through your right nostril.
            6. Inhale through your right nostril.
            7. Close your right nostril and exhale through your left nostril.
            8. Repeat the cycle several times.

            -----

            Lions Breath
            1. Sit in a comfortable position with your spine straight.
            2. Inhale deeply through your nose.
            3. Open your mouth wide and stick out your tongue.
            4. Exhale forcefully, making a "ha" sound.
            5. Repeat a few times.

            -----

            Resonance Breathing
            1. Sit quietly and close your eyes.
            2. Inhale slowly for a count of 5.
            3. Exhale slowly for a count of 5.
            4. Repeat this pattern for a few minutes.

            -----

            Pursed Lip Breathing
            1. Sit comfortably and relax your neck and shoulders.
            2. Inhale deeply through your nose for 2 seconds.
            3. Purse your lips as if you're going to whistle.
            4. Exhale slowly through your pursed lips for 4 seconds.
            5. Continue this breathing pattern for several minutes.
        """.trimIndent()

        `when`(aiService.sendRequestToAI(anyString())).thenReturn(aiResponse)

        val request = GetBreathExerciseForUserDto(mood = "happy", userId = 228)
        val breathExerciseForUserDto = userAIService.getBreathExercise(request)

        val response = breathExerciseForUserDto.response
        Assertions.assertEquals(7, response.size)

        val expectedKeys = listOf(
            "Diaphragmatic Breathing",
            "Box Breathing",
            "4-7-8 Breathing",
            "Alternate Nostril Breathing",
            "Lions Breath",
            "Resonance Breathing",
            "Pursed Lip Breathing"
        )
        Assertions.assertEquals(expectedKeys, response.keys.toList())

        Assertions.assertEquals(
            """
            1. Sit or lie down in a comfortable position.
            2. Place one hand on your chest and the other on your abdomen.
            3. Inhale deeply through your nose, ensuring your abdomen rises more than your chest.
            4. Exhale slowly through your mouth.
            5. Repeat for several minutes.
        """.trimIndent(), response["Diaphragmatic Breathing"]
        )
    }
}
