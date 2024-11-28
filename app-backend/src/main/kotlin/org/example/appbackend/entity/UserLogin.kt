package org.example.appbackend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "user_logins")
class UserLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_login_sequence")
    @SequenceGenerator(name = "user_login_sequence", sequenceName = "user_login_sequence", allocationSize = 1)
    @Column(name = "id")
    val id: Int? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User? = null

    @Column(name = "login_time", nullable = false)
    var loginTime: LocalDateTime = LocalDateTime.now()
}
