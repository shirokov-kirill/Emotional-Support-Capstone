package org.example.appbackend.service

interface AuthService {

    fun createToken(userId : Int): String
    fun deleteToken(token: String)
}