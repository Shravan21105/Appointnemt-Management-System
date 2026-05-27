package com.shravan.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentResponse {

    private Long appointmentId;
    private String doctorName;
    private String patientName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
}
