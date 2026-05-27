package com.shravan.backend.controller;

import com.shravan.backend.dto.AppointmentRequest;
import com.shravan.backend.dto.AppointmentResponse;
import com.shravan.backend.dto.AppointmentStatusUpdateRequest;
import com.shravan.backend.service.AppointmentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService
            appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService =
                appointmentService;
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse>
    bookAppointment(
            @RequestBody
            AppointmentRequest request) {

        AppointmentResponse response =
                appointmentService
                        .bookAppointment(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity
            <List<AppointmentResponse>>
    getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService
                        .getAllAppointments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse>
    getAppointmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse>
    updateAppointmentStatus(

            @PathVariable Long id,

            @RequestBody
            AppointmentStatusUpdateRequest request
    ) {

        return ResponseEntity.ok(
                appointmentService
                        .updateAppointmentStatus(
                                id,
                                request.getStatus()
                        )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteAppointment(
            @PathVariable Long id) {

        appointmentService
                .deleteAppointment(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}