package org.example.appbackend.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.example.appbackend.service.UserService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.IOException
import java.util.*
import org.slf4j.LoggerFactory

class JwtTokenFilter(
        @Value("\${spring.jwt.secret}")
        private val jwtSecret: String,
        private val userService: UserService
) : OncePerRequestFilter() {

    private var logger = LoggerFactory.getLogger(JwtTokenFilter::class.java)

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
            request: HttpServletRequest,
            response: HttpServletResponse,
            filterChain: FilterChain
    ) {
        logger.info("/JwtTokenFilter: secret - $jwtSecret")
        val authorizationHeader = request.getHeader("Authorization")

        var userId: Int? = null
        var jwtToken: String? = null

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7)
            logger.info("/JwtTokenFilter: jwtToken= $jwtToken")
            try {
                userId = extractUserId(jwtToken)
                logger.info("/JwtTokenFilter: userId= $userId")
            } catch (e: IllegalArgumentException) {
                // Log the error
                logger.error("Invalid JWT token: ${e.message}")
                // Return HTTP unauthorized response
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token")
                return
            }
        }

        if (userId != null && SecurityContextHolder.getContext().authentication == null) {
            logger.info("/JwtTokenFilter: 2")
            val userDetails = userService.getUserById(userId)
            logger.info("/JwtTokenFilter: username= ${userDetails.username}")
            if (userDetails != null) {
                val authenticationToken = UsernamePasswordAuthenticationToken(
                        userDetails, null, null
                )
                logger.info("/JwtTokenFilter: 3")
                authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                logger.info("/JwtTokenFilter: 4")
                SecurityContextHolder.getContext().authentication = authenticationToken
            }
        }
        filterChain.doFilter(request, response)
    }

    private fun extractUserId(token: String): Int {
        val decodedKey = Base64.getDecoder().decode(jwtSecret)
        val signingKey = Keys.hmacShaKeyFor(decodedKey)
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .body
                .subject
                ?.toInt() ?: throw IllegalArgumentException("User ID not found in token")
    }
}
