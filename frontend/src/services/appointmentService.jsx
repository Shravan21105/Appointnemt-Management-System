import API from "../api/api";

export const getAppointments = async () => {
  return await API.get("/appointments");
};

export const createAppointment = async (appointment) => {
  return await API.post("/appointments", appointment);
};