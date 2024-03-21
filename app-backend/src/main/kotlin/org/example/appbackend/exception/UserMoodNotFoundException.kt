package org.example.appbackend.exception

class UserMoodNotFoundException(id: Int) : RuntimeException("User mood with id $id was not found")