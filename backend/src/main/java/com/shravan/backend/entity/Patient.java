package com.shravan.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.List;


@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message =
            "Patient name is required")
    private String ptName;

    @Min(value = 1,
            message = "Age must be greater than 0")
    private int age;

    @NotBlank(message =
            "Disease is required")
    private String disease;

    @Email(message =
            "Invalid email format")
    private String email;

    public Patient(){

    }

    public Patient(String ptName, int age, String disease, String email){
        this.ptName = ptName;
        this.age = age;
        this.disease = disease;
        this.email = email;
    }

    public long getId(){
        return id;
    }

    public String getPtName(){
        return ptName;
    }

    public int getAge(){
        return age;
    }

    public String getDisease(){
        return disease;
    }

    public String getEmail(){
        return email;
    }

    public void setPtName(String ptName) {
        this.ptName = ptName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;

}
