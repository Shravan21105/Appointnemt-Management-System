import API from "../api/api";

export const getPatients = async () => {
  return await API.get("/patients");
};

export const createPatient = async (patient) => {
  return await API.post("/patients", patient);
};