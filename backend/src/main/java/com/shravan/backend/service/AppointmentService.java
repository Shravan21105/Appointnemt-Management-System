package com.shravan.backend.service;

import com.shravan.backend.dto.AppointmentRequest;
import com.shravan.backend.dto.AppointmentResponse;

import java.util.List;

public interface AppointmentService {

    AppointmentResponse bookAppointment(
            AppointmentRequest request
    );

    List<AppointmentResponse> getAllAppointments();

    AppointmentResponse getAppointmentById(Long id);

    AppointmentResponse updateAppointmentStatus(
            Long id,
            String status
    );

    void deleteAppointment(Long id);
}