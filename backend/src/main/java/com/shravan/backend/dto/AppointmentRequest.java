package com.shravan.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentRequest {

    private Long doctorId;
    private Long patientId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;


}
