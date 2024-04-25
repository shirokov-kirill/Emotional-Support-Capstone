package org.example.appbackend.service

import org.example.appbackend.dto.ChatProfileDto
import org.example.appbackend.dto.ChatWithMessagesDto
import org.example.appbackend.dto.DoctorCredentialsDto
import org.example.appbackend.dto.MessageDto
import org.example.appbackend.dto.UserDto
import org.springframework.stereotype.Service

@Service
class ChatWithMessagesServiceImpl(
    val messageService: MessageService,
    val chatService: ChatService,
    val userService: UserService,
    val doctorService: DoctorCredentialsService
) : ChatWithMessagesService {

    companion object {
        // Need a crutch for the front-end. It will be removed in the future
        private const val URL = "https://via.placeholder.com/30"
    }

    override fun getChatWithMessagesAndProfiles(chatId: Int): ChatWithMessagesDto {
        val messagesDto = messageService.getAllMessagesByChatId(chatId)
        val chat = chatService.getChatById(chatId)
        val user = userService.getUserById(chat.userId)
        val doctor = doctorService.getDoctorById(chat.doctorId)

        return formChatWithMessagesDto(user, doctor, messagesDto)
    }

    private fun formChatWithMessagesDto(user: UserDto,
                                        doctor: DoctorCredentialsDto,
                                        messagesDto: List<MessageDto>) : ChatWithMessagesDto =
        ChatWithMessagesDto(
            formUserProfile(user),
            formDoctorProfile(doctor),
            messagesDto
        )

    private fun formUserProfile(user: UserDto): ChatProfileDto {
        val userName = user.firstName ?: throw IllegalStateException("User name was not set")
        return formChatProfile(user.id, userName)
    }

    private fun formDoctorProfile(doctor: DoctorCredentialsDto): ChatProfileDto {
        val doctorId = doctor.id ?: throw IllegalStateException("Doctor id was not set")
        val doctorName = doctor.name ?: throw IllegalStateException("Doctor name was not set")
        return formChatProfile(doctorId, doctorName)
    }

    private fun formChatProfile(profileId: Int, profileName: String): ChatProfileDto =
        ChatProfileDto(profileId, URL, profileName)
}