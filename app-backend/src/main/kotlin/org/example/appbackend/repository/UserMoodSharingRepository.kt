package org.example.appbackend.repository

import org.example.appbackend.entity.UserMoodSharing
import org.springframework.data.repository.CrudRepository

interface UserMoodSharingRepository : CrudRepository<UserMoodSharing, Int>