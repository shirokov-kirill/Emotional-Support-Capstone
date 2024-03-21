package org.example.appbackend.controller

import org.example.appbackend.dto.ExceptionDto
import org.example.appbackend.exception.UserMoodIdNotAssignedException
import org.example.appbackend.exception.UserMoodNotFoundException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler


@ControllerAdvice
class UserMoodExceptionController {

    private var logger = LoggerFactory.getLogger(UserMoodExceptionController::class.java)

    @ExceptionHandler
    fun handleNotFoundException(ex: UserMoodNotFoundException): ResponseEntity<ExceptionDto> {
        logger.error(ex.message)
        val dto = ExceptionDto(HttpStatus.NOT_FOUND.value(), ex.message)
        return ResponseEntity(dto, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler
    fun handleIdNotAssignedException(ex: UserMoodIdNotAssignedException): ResponseEntity<ExceptionDto> {
        logger.error(ex.message)
        val dto = ExceptionDto(HttpStatus.BAD_REQUEST.value(), ex.message)
        return ResponseEntity(dto, HttpStatus.BAD_REQUEST)
    }
}