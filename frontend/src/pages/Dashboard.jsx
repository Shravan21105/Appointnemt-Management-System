import { useEffect, useState } from "react";

import axios from "axios";

import BASE_URL, { getAuthHeader } from "../api/api";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  const [patients, setPatients] = useState([]);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [doctorRes, patientRes, appointmentRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/doctors`, getAuthHeader()),

        axios.get(`${BASE_URL}/api/patients`, getAuthHeader()),

        axios.get(`${BASE_URL}/api/appointments`, getAuthHeader()),
      ]);

      setDoctors(doctorRes.data);

      setPatients(patientRes.data);

      setAppointments(appointmentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  ).length;

  return (
    <div className="max-w-7xl mx-auto p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-3 text-center">Dashboard</h1>
        <p className="text-gray-500 text-lg text-center">Appointment management overview</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* DOCTORS */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            Total Doctors
          </h2>

          <p className="text-5xl font-bold text-blue-600">{doctors.length}</p>
        </div>

        {/* PATIENTS */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-green-500">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            Total Patients
          </h2>

          <p className="text-5xl font-bold text-green-600">{patients.length}</p>
        </div>

        {/* APPOINTMENTS */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-purple-500">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            Total Appointments
          </h2>

          <p className="text-5xl font-bold text-purple-600">
            {appointments.length}
          </p>
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            Pending Appointments
          </h2>

          <p className="text-5xl font-bold text-yellow-500">
            {pendingAppointments}
          </p>
        </div>

        {/* COMPLETED */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-emerald-500">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            Completed Appointments
          </h2>

          <p className="text-5xl font-bold text-emerald-600">
            {completedAppointments}
          </p>
        </div>
      </div>

      {/* RECENT APPOINTMENTS */}

      <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Recent Appointments
          </h2>

          <span className="text-gray-500">Latest hospital activity</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">Doctor</th>

                <th className="p-4 text-left">Patient</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments
                .slice(-5)
                .reverse()
                .map((appointment) => (
                  <tr
                    key={appointment.appointmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {appointment.doctorName}
                    </td>

                    <td className="p-4">{appointment.patientName}</td>

                    <td className="p-4">{appointment.appointmentDate}</td>

                    <td className="p-4">
                      <span
                        className={`

                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                      appointment.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : appointment.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                    }

                  `}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
