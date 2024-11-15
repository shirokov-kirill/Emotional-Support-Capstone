package org.example.appbackend.controller

import org.example.appbackend.dto.ExceptionDto
import org.example.appbackend.exception.AIException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class AIExceptionController {

    private var logger = LoggerFactory.getLogger(AIExceptionController::class.java)

    @ExceptionHandler
    fun handleException(ex: AIException): ResponseEntity<ExceptionDto> {
        logger.error(ex.message)
        val dto = ExceptionDto(HttpStatus.BAD_REQUEST.value(), ex.message)
        return ResponseEntity(dto, HttpStatus.BAD_REQUEST)
    }
}