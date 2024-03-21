package org.example.appbackend.repository

import org.example.appbackend.entity.UserMood
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserMoodRepository : CrudRepository<UserMood, Int>