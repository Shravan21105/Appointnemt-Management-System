import { useEffect, useState } from "react";

import axios from "axios";

import BASE_URL, { getAuthHeader } from "../api/api";

const Appointments = () => {
  const API_URL = `${BASE_URL}/api/appointments`;

  const [appointments, setAppointments] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [patients, setPatients] = useState([]);

  const [doctorId, setDoctorId] = useState("");

  const [patientId, setPatientId] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");

  const [appointmentTime, setAppointmentTime] = useState("");

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeader());

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH DOCTORS
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/doctors`,
        getAuthHeader(),
      );

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PATIENTS
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/patients`,
        getAuthHeader(),
      );

      setPatients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchAppointments();

    fetchDoctors();

    fetchPatients();
  }, []);

  // RESET FORM
  const resetForm = () => {
    setDoctorId("");

    setPatientId("");

    setAppointmentDate("");

    setAppointmentTime("");
  };

  // BOOK APPOINTMENT
  const saveAppointment = async () => {
    if (!doctorId || !patientId || !appointmentDate || !appointmentTime) {
      alert("All fields required");

      return;
    }

    const appointment = {
      doctorId,

      patientId,

      appointmentDate,

      appointmentTime,
    };

    try {
      await axios.post(API_URL, appointment, getAuthHeader());

      fetchAppointments();

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/${id}/status?status=${status}`,

        {},

        getAuthHeader(),
      );

      // UPDATE LOCAL STATE IMMEDIATELY
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointmentId === id
            ? {
                ...appointment,
                status,
              }
            : appointment,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE APPOINTMENT
  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm("Delete Appointment?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/${id}`,

        getAuthHeader(),
      );

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border border-green-300";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700 border border-blue-300";

      case "CANCELLED":
        return "bg-red-100 text-red-700 border border-red-300";

      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Appointment Management
        </h1>

        <p className="text-gray-500 mt-2">Manage hospital appointments</p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Book Appointment
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {/* DOCTOR */}
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.drName}
              </option>
            ))}
          </select>

          {/* PATIENT */}
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.ptName}
              </option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* TIME */}
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={saveAppointment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Appointment
          </button>

          <button
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* TABLE HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Appointments List
          </h2>

          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
            Total: {appointments.length}
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">Doctor</th>

                <th className="p-4 text-left">Patient</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Time</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr
                    key={appointment.appointmentId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-semibold text-purple-600">
                      {appointment.appointmentId}
                    </td>

                    <td className="p-4">{appointment.doctorName}</td>

                    <td className="p-4">{appointment.patientName}</td>

                    <td className="p-4">{appointment.appointmentDate}</td>

                    <td className="p-4">{appointment.appointmentTime}</td>

                    {/* STATUS */}
                    <td className="p-4">
                      <div
                        className={`

                                  inline-flex
                                  items-center
                                  rounded-xl
                                  border
                                  px-3
                                  py-2
                                  font-semibold
                                                    
                                  ${getStatusStyle(appointment.status)}
                                                    
                                `}
                      >
                        <select
                          value={appointment.status || "PENDING"}
                          onChange={(e) =>
                            updateStatus(
                              appointment.appointmentId,
                              e.target.value,
                            )
                          }
                          className="bg-transparent outline-none cursor-pointer"
                        >
                          <option value="PENDING">PENDING</option>

                          <option value="APPROVED">APPROVED</option>

                          <option value="COMPLETED">COMPLETED</option>

                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            deleteAppointment(appointment.appointmentId)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No Appointments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
