import API from "../api/api";

export const getDoctors = async () => {
  return await API.get("/doctors");
};

export const createDoctor = async (doctor) => {
  return await API.post("/doctors", doctor);
};