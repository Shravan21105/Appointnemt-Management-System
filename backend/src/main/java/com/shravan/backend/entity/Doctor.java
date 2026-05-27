package com.shravan.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message =
            "Doctor name is required")
    private String drName;

    @NotBlank(message =
            "Specialization is required")
    private String specialization;

    @Email(message =
            "Invalid email format")
    private String email;

    public Doctor(){

    }

    public Doctor(String drName, String specialization, String email){
        this.drName = drName;
        this.specialization = specialization;
        this.email = email;
    }

    public long getId(){
        return id;
    }

    public String getDrName(){
      return drName;
    }

    public String getSpecialization(){
        return specialization;
    }

    public String getEmail(){
        return email;
    }

    public void setDrName(String drName){
        this.drName = drName;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;




}
