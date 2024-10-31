package org.example.appbackend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table

@Entity
@Table(name = "doctor_specialization")
class DoctorSpecialization {

    @Id
    @GeneratedValue(generator = "doctor_specialization_id_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "doctor_specialization_id_sequence", sequenceName = "seq_doctor_specialization_id", allocationSize = 1)
    var id: Int? = null

    @Column(name = "specialization")
    var specialization: String? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "doctor_id")
    var doctorId: Int? = null
}
