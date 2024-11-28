package org.example.appbackend.service

interface AIService {

    fun sendRequestToAI(prompt: String): String

}