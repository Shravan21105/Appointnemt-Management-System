package com.shravan.backend.service.impl;

import com.shravan.backend.entity.Patient;
import com.shravan.backend.repository.PatientRepository;
import com.shravan.backend.service.PatientService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl
        implements PatientService {

    private final PatientRepository patientRepository;

    public PatientServiceImpl(
            PatientRepository patientRepository) {

        this.patientRepository = patientRepository;
    }

    @Override
    public List<Patient> getAllPatients() {

        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {

        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Patient Not Found"));
    }

    @Override
    public Patient createPatient(Patient patient) {

        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(
            Long id,
            Patient patient) {

        Patient currentPatient =
                patientRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Patient Not Found"));

        currentPatient.setPtName(
                patient.getPtName());

        currentPatient.setAge(
                patient.getAge());

        currentPatient.setDisease(
                patient.getDisease());

        currentPatient.setEmail(
                patient.getEmail());

        return patientRepository.save(currentPatient);
    }

    @Override
    public void deletePatient(Long id) {

        Patient patient =
                patientRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Patient Not Found"));

        patientRepository.delete(patient);
    }
}