import { useState } from "react";

import { loginUser } from "../api/api";

import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const data = await loginUser(
        username,
        password
      );

      console.log("LOGIN RESPONSE:", data);

      // CASE 1 -> { token : "jwt" }
      if (data?.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/dashboard");

        return;
      }

      // CASE 2 -> raw JWT string
      if (typeof data === "string") {

        localStorage.setItem(
          "token",
          data
        );

        navigate("/dashboard");

        return;
      }

      alert("Invalid Credentials");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;