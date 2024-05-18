package org.example.appbackend.repository

import org.example.appbackend.entity.FeedbackEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FeedbackRepository : CrudRepository<FeedbackEntity, Int>
