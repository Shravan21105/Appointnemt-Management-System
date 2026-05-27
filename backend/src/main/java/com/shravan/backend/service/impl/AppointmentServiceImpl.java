package com.shravan.backend.service.impl;

import com.shravan.backend.dto.AppointmentRequest;
import com.shravan.backend.dto.AppointmentResponse;
import com.shravan.backend.entity.Appointment;
import com.shravan.backend.entity.Doctor;
import com.shravan.backend.entity.Patient;
import com.shravan.backend.repository.AppointmentRepository;
import com.shravan.backend.repository.DoctorRepository;
import com.shravan.backend.repository.PatientRepository;
import com.shravan.backend.service.AppointmentService;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentServiceImpl
        implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    private final DoctorRepository doctorRepository;

    private final PatientRepository patientRepository;

    public AppointmentServiceImpl(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository) {

        this.appointmentRepository =
                appointmentRepository;

        this.doctorRepository =
                doctorRepository;

        this.patientRepository =
                patientRepository;
    }

    @Override
    public AppointmentResponse bookAppointment(
            AppointmentRequest request) {

        Doctor doctor = doctorRepository.findById(
                request.getDoctorId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Doctor Not Found"));

        Patient patient = patientRepository.findById(
                request.getPatientId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Patient Not Found"));

        Appointment appointment =
                new Appointment();

        appointment.setDoctor(doctor);

        appointment.setPatient(patient);

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setAppointmentTime(
                request.getAppointmentTime());

        appointment.setStatus("PENDING");

        Appointment savedAppointment =
                appointmentRepository.save(
                        appointment);

        return mapToResponse(savedAppointment);
    }

    @Override
    public List<AppointmentResponse>
    getAllAppointments() {

        List<Appointment> appointments =
                appointmentRepository.findAll();

        List<AppointmentResponse> responses =
                new ArrayList<>();

        for (Appointment appointment
                : appointments) {

            responses.add(
                    mapToResponse(appointment));
        }

        return responses;
    }

    @Override
    public AppointmentResponse
    getAppointmentById(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment Not Found"));

        return mapToResponse(appointment);
    }

    @Override
    public AppointmentResponse
    updateAppointmentStatus(
            Long id,
            String status) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment Not Found"));

        appointment.setStatus(status);

        Appointment updatedAppointment =
                appointmentRepository.save(
                        appointment);

        return mapToResponse(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment Not Found"));

        appointmentRepository.delete(appointment);
    }

    private AppointmentResponse
    mapToResponse(Appointment appointment) {

        AppointmentResponse response =
                new AppointmentResponse();

        response.setAppointmentId(
                appointment.getId());

        response.setDoctorName(
                appointment.getDoctor()
                        .getDrName());

        response.setPatientName(
                appointment.getPatient()
                        .getPtName());

        response.setAppointmentDate(
                appointment.getAppointmentDate());

        response.setAppointmentTime(
                appointment.getAppointmentTime());

        response.setStatus(
                appointment.getStatus());

        return response;
    }
}