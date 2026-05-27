import { useEffect, useState } from "react";

import axios from "axios";

import BASE_URL,
{
  getAuthHeader
} from "../api/api";

const Doctors = () => {

  const API_URL =
    `${BASE_URL}/api/doctors`;

  const [doctors, setDoctors] =
    useState([]);

  const [drName, setDrName] =
    useState("");

  const [
    specialization,
    setSpecialization
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  // FETCH DOCTORS
  const fetchDoctors = async () => {

    try {

      const response =
        await axios.get(
          API_URL,
          getAuthHeader()
        );

      setDoctors(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchDoctors();

  }, []);

  // RESET FORM
  const resetForm = () => {

    setDrName("");

    setSpecialization("");

    setEmail("");

    setEditId(null);
  };

  // ADD OR UPDATE DOCTOR
  const saveDoctor = async () => {

    if (
      !drName ||
      !specialization ||
      !email
    ) {

      alert(
        "All fields are required"
      );

      return;
    }

    const doctor = {

      drName,

      specialization,

      email,
    };

    try {

      // CREATE
      if (editId == null) {

        await axios.post(
          API_URL,
          doctor,
          getAuthHeader()
        );
      }

      // UPDATE
      else {

        await axios.put(

          `${API_URL}/${editId}`,

          doctor,

          getAuthHeader()
        );
      }

      fetchDoctors();

      resetForm();

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT DOCTOR
  const editDoctor = (doctor) => {

    setDrName(doctor.drName);

    setSpecialization(
      doctor.specialization
    );

    setEmail(doctor.email);

    setEditId(doctor.id);
  };

  // DELETE DOCTOR
  const deleteDoctor = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete Doctor?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `${API_URL}/${id}`,

        getAuthHeader()
      );

      fetchDoctors();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="max-w-7xl mx-auto p-10">

      {/* HEADING */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Doctor Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage doctors efficiently
        </p>

      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">

          {editId == null
            ? "Add Doctor"
            : "Update Doctor"}

        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Doctor Name"
            value={drName}
            onChange={(e) =>
              setDrName(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) =>
              setSpecialization(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4">

          <button
            onClick={saveDoctor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >

            {editId == null
              ? "Add Doctor"
              : "Update Doctor"}

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
            Doctors List
          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            Total: {doctors.length}

          </span>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Specialization
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {doctors.length > 0 ? (

                doctors.map((doctor) => (

                  <tr
                    key={doctor.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-semibold text-blue-600">
                      {doctor.id}
                    </td>

                    <td className="p-4">
                      {doctor.drName}
                    </td>

                    <td className="p-4">
                      {doctor.specialization}
                    </td>

                    <td className="p-4">
                      {doctor.email}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            editDoctor(doctor)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteDoctor(
                              doctor.id
                            )
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

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No Doctors Found
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

export default Doctors;