import axios from "axios";

const BASE_URL =
  "http://localhost:8080";

export const loginUser =
async (username, password) => {

  try {

    const response =
      await axios.post(

        `${BASE_URL}/auth/login`,

        {
          username,
          password,
        }
      );

    return response.data;

  } catch (error) {

    console.log(error);
  }
};

export const getAuthHeader = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
};

export default BASE_URL;