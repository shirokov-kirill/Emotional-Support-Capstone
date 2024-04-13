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
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jws
import io.jsonwebtoken.JwtException
import java.security.Key
import java.util.Date
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
        val authorizationHeader = request.getHeader("Authorization")

        var userId: Int? = null
        var jwtToken: String?

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7)
            logger.info("/JwtTokenFilter: jwtToken= $jwtToken")
            try {
                val session = request.session
                val token = session.getAttribute("token") as? String
                logger.info("/JwtTokenFilter: session token = $token")
                if (token != jwtToken) {
                    throw IllegalArgumentException("Token not found.")
                }
                userId = extractUserId(jwtToken)
                logger.info("/JwtTokenFilter: userId = $userId")
            } catch (e: IllegalArgumentException) {
                // Log the error
                logger.error("Invalid JWT token: ${e.message}")
                // Return HTTP unauthorized response
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token")
                return
            }
        }

        if (userId != null && SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userService.getUserById(userId)
            logger.info("/JwtTokenFilter: username= ${userDetails.username}")
            if (userDetails != null) {
                val authenticationToken = UsernamePasswordAuthenticationToken(
                        userDetails, null, null
                )
                authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authenticationToken
                logger.info("/JwtTokenFilter: end.")
            }
        }
        filterChain.doFilter(request, response)
    }

    private fun extractUserId(token: String): Int {
        val keyBytes = jwtSecret.toByteArray(Charsets.UTF_8) // Correct encoding to Byte array
        val key: Key = Keys.hmacShaKeyFor(keyBytes)

        val claimsJws: Jws<Claims> = try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
        } catch (e: JwtException) {
            throw IllegalArgumentException("Invalid JWT token: ${e.message}")
        }

        val claims = claimsJws.body
        val expiration = claims.expiration

        // Check if token has expired
        if (expiration != null && expiration.before(Date())) {
            throw IllegalArgumentException("JWT token has expired.")
        }

        val parsedUserId = claims.subject
        return parsedUserId.toInt()
    }
}
