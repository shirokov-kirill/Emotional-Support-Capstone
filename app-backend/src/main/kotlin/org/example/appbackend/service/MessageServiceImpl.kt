package org.example.appbackend.service

import org.example.appbackend.dto.MessageDto
import org.example.appbackend.entity.MessagePk
import org.example.appbackend.mapper.MessageMapper
import org.example.appbackend.repository.MessageRepository
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

const val MAX_RETRY = 100

@Service
class MessageServiceImpl(
    private val messageRepository: MessageRepository,
    private val messageMapper: MessageMapper
) : MessageService {

    private val logger = LoggerFactory.getLogger(MessageServiceImpl::class.java)

    @Transactional
    override fun createMessage(messageDto: MessageDto): MessageDto {
        require(messageDto.messageOrd == null) { "'messageOrd' must be null when creating a new message" }
        require(messageDto.created == null) { "'created' must be null when creating a new message" }
        repeat(MAX_RETRY) {
            try {
                val currentMaxOrd = messageRepository.findMaxMessageOrdByChatId(messageDto.chatId)?.messageOrd ?: 0
                val nextOrd = currentMaxOrd + 1
                val messageDtoWithOrd = messageDto.copy(messageOrd = nextOrd)
                val message = messageMapper.dtoToEntity(messageDtoWithOrd)
                val savedMessage = messageRepository.save(message)
                return messageMapper.entityToDto(savedMessage)
            } catch (e: DataIntegrityViolationException) {
                logger.info("Failed to create message, retrying...", e)
                Thread.sleep(10)
            }
        }
        error("Failed to create message after $MAX_RETRY retries.")
    }

    @Transactional(readOnly = true)
    override fun getMessageById(chatId: Int, messageOrd: Int): MessageDto {
        val message = messageRepository.findById(MessagePk(chatId, messageOrd)).orElseThrow {
            RuntimeException("Message not found with chatId: $chatId and messageOrd: $messageOrd")
        }
        return messageMapper.entityToDto(message)
    }

    @Transactional(readOnly = true)
    override fun getAllMessagesByChatId(chatId: Int): List<MessageDto> {
        val messages = messageRepository.findByChatIdOrderByMessageOrdDesc(chatId)
        return messages.map(messageMapper::entityToDto)
    }

    @Transactional
    override fun updateMessage(messageDto: MessageDto): MessageDto {
        require(messageDto.messageOrd != null) { "'messageOrd' must be provided for update" }
        val message = messageMapper.dtoToEntity(messageDto)
        val chatId = message.chatId ?: error("'chatId' expected to be not null here")
        val messageOrd = message.messageOrd ?: error("'messageOrd' expected to be not null here")
        val messagePk = MessagePk(chatId, messageOrd)
        messageRepository.findById(messagePk).orElseThrow {
            RuntimeException("Message not found for update with chatId: $chatId and messageOrd: $messageOrd")
        }
        val updatedMessage = messageRepository.save(message)
        return messageMapper.entityToDto(updatedMessage)
    }
}
