package org.example.appbackend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.example.appbackend.service.UserService
import org.example.appbackend.repository.AuthTokenRepository
import org.springframework.beans.factory.annotation.Autowired
import org.example.appbackend.config.JwtTokenFilter
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.web.AuthenticationEntryPoint
import jakarta.servlet.http.HttpServletResponse

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var authTokenRepository: AuthTokenRepository

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String

    @Bean
    fun jwtTokenFilter(): JwtTokenFilter = JwtTokenFilter(jwtSecret, userService, authTokenRepository)

    @Bean
    fun authenticationEntryPoint(): AuthenticationEntryPoint {
        return AuthenticationEntryPoint { request, response, authException ->
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.writer.write("Unauthorized")
        }
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf().disable()
            .authorizeRequests()
            .requestMatchers(HttpMethod.POST, "/users").permitAll()
            .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/doctor/register").permitAll()
            .requestMatchers(HttpMethod.GET, "/users/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)
            .sessionManagement()
            .and()
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())

        return http.build()
    }
}
