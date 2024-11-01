package org.example.appbackend.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "doctor_credentials")
class DoctorCredentials {
    @Id
    @GeneratedValue(generator = "doctor_credentials_id_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(
        name = "doctor_credentials_id_sequence",
        sequenceName = "seq_doctor_credentials_id",
        allocationSize = 1
    )
    var id: Int? = null

    @Column(name = "username")
    var username: String? = null

    @Column(name = "password")
    var password: String? = null

    @Column(name = "name")
    var firstName: String? = null

    @Column(name = "surname")
    var lastName: String? = null

    @Column(name = "birth_date")
    var dateOfBirth: LocalDate? = null

    @Column(name = "email")
    var email: String? = null

    @Column(name = "created")
    var created: LocalDateTime? = null

    @Column(name = "clinic")
    var clinic: String? = null

    @Column(name = "specialisation")
    var specialisation: String? = null

    @Column(name = "agreedForRecommendations")
    var agreedForRecommendations: Boolean? = null

//  TODO    @Column(name = "sertification")
//    var sertification: LocalDateTime? = null
}
