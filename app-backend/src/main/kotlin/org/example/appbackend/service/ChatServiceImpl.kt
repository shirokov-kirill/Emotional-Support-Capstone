package org.example.appbackend.service

import org.example.appbackend.dto.ChatDto
import org.example.appbackend.mapper.ChatMapper
import org.example.appbackend.repository.ChatRepository
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ChatServiceImpl(
    private val chatRepository: ChatRepository,
    private val chatMapper: ChatMapper
) : ChatService {

    @Transactional
    override fun createChat(chatDto: ChatDto): ChatDto {
        require(chatDto.id == null) { "ID must be null when creating a new chat" }
        try {
            val chat = chatMapper.dtoToEntity(chatDto)
            val savedChat = chatRepository.save(chat)
            return chatMapper.entityToDto(savedChat)
        } catch (e: DataIntegrityViolationException) {
            // Chat was already created
            val chat = chatRepository.findByUserIdAndDoctorId(chatDto.userId, chatDto.doctorId)
            chat ?: error("Unexpected error: chat was not created")
            return chatMapper.entityToDto(chat)
        }
    }

    @Transactional(readOnly = true)
    override fun getChatById(id: Int): ChatDto {
        val chat = chatRepository.findById(id).orElseThrow {
            RuntimeException("Chat not found with id: $id")
        }
        return chatMapper.entityToDto(chat)
    }

    @Transactional(readOnly = true)
    override fun getAllChatsByUserId(userId: Int): List<ChatDto> {
        val chats = chatRepository.findByUserId(userId)
        return chats.map(chatMapper::entityToDto)
    }

    @Transactional(readOnly = true)
    override fun getAllChatsByDoctorId(doctorId: Int): List<ChatDto> {
        val chats = chatRepository.findByDoctorId(doctorId)
        return chats.map(chatMapper::entityToDto)
    }
}
