import { useEffect, useState } from "react";

import axios from "axios";

import BASE_URL,
{
  getAuthHeader
} from "../api/api";

const Patients = () => {

  const API_URL =
    `${BASE_URL}/api/patients`;

  const [patients, setPatients] =
    useState([]);

  const [ptName, setPtName] =
    useState("");

  const [disease, setDisease] =
    useState("");

  const [age, setAge] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const fetchPatients = async () => {

    try {

      const response =
        await axios.get(
          API_URL,
          getAuthHeader()
        );

      setPatients(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchPatients();

  }, []);

  const resetForm = () => {

    setPtName("");
    setDisease("");
    setAge("");
    setEmail("");
    setEditId(null);
  };

  const savePatient = async () => {

    if (
      !ptName ||
      !disease ||
      !age ||
      !email
    ) {

      alert("All fields required");

      return;
    }

    const patient = {

      ptName,

      disease,

      age,

      email,
    };

    try {

      if (editId == null) {

        await axios.post(
          API_URL,
          patient,
          getAuthHeader()
        );

      } else {

        await axios.put(
          `${API_URL}/${editId}`,
          patient,
          getAuthHeader()
        );
      }

      fetchPatients();

      resetForm();

    } catch (error) {

      console.log(error);
    }
  };

  const editPatient = (patient) => {

    setPtName(patient.ptName);

    setDisease(patient.disease);

    setAge(patient.age);

    setEmail(patient.email);

    setEditId(patient.id);
  };

  const deletePatient = async (id) => {

    const confirmDelete =
      window.confirm("Delete Patient?");

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API_URL}/${id}`,
        getAuthHeader()
      );

      fetchPatients();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="max-w-7xl mx-auto p-10">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Patient Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage patients efficiently
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">

          {editId == null
            ? "Add Patient"
            : "Update Patient"}

        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Patient Name"
            value={ptName}
            onChange={(e) =>
              setPtName(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Disease"
            value={disease}
            onChange={(e) =>
              setDisease(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="mt-6 flex gap-4">

          <button
            onClick={savePatient}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >

            {editId == null
              ? "Add Patient"
              : "Update Patient"}

          </button>

          <button
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-800">
            Patients List
          </h2>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

            Total: {patients.length}

          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Disease</th>

                <th className="p-4 text-left">Age</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-center">Actions</th>

              </tr>
            </thead>

            <tbody>

              {patients.map((patient) => (

                <tr
                  key={patient.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {patient.id}
                  </td>

                  <td className="p-4">
                    {patient.ptName}
                  </td>

                  <td className="p-4">
                    {patient.disease}
                  </td>

                  <td className="p-4">
                    {patient.age}
                  </td>

                  <td className="p-4">
                    {patient.email}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          editPatient(patient)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deletePatient(patient.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

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

export default Patients;