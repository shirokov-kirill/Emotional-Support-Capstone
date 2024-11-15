package org.example.appbackend.utils

import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.context.MessageSource
import org.springframework.stereotype.Component
import java.util.*

@Component
object MessageSourceProvider : ApplicationContextAware {

    private lateinit var context: ApplicationContext

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        context = applicationContext
    }

    fun getMessage(key: String, vararg args: Any): String {
        val messageSource = context.getBean(MessageSource::class.java)
        return messageSource.getMessage(key, args, Locale.getDefault())
    }
}
