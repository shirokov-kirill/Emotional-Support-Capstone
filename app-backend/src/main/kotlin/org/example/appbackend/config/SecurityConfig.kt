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
import org.springframework.beans.factory.annotation.Autowired
import org.example.appbackend.config.JwtTokenFilter
import org.springframework.beans.factory.annotation.Value

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Autowired
    private lateinit var userService: UserService

    @Value("\${spring.jwt.secret}")
    private lateinit var jwtSecret: String

    @Bean
    fun jwtTokenFilter(): JwtTokenFilter = JwtTokenFilter(jwtSecret, userService)

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
                .csrf().disable()
                .authorizeHttpRequests { auth ->
                    auth.requestMatchers("/auth/login", "/users").permitAll()
                            .requestMatchers(HttpMethod.POST, "/users").denyAll()
                            .anyRequest().authenticated()
                }
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()  // Ensure chaining by calling 'and()' before adding another configuration
                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
}
