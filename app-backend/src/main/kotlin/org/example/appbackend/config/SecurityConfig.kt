package org.example.appbackend.config

import jakarta.servlet.http.HttpServletResponse
import org.example.appbackend.repository.AuthTokenRepository
import org.example.appbackend.service.DoctorCredentialsService
import org.example.appbackend.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var authTokenRepository: AuthTokenRepository

    @Autowired
    private lateinit var doctorService: DoctorCredentialsService

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String

    @Bean
    fun jwtTokenFilter(): JwtTokenFilter = JwtTokenFilter(jwtSecret, userService, doctorService, authTokenRepository)

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
            .requestMatchers(HttpMethod.POST, "/auth/doctor-login").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)
            .sessionManagement()
            .and()
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())

        return http.build()
    }
}
