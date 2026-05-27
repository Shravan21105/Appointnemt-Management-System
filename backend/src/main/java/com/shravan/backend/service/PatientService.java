package com.shravan.backend.service;

import com.shravan.backend.entity.Patient;

import java.util.List;

public interface PatientService {

    List<Patient> getAllPatients();

    Patient getPatientById(Long id);

    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    void deletePatient(Long id);
}