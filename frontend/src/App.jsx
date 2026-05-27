import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute
from "./components/ProtectedRoute";

import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Doctors
from "./pages/Doctors";

import Patients
from "./pages/Patients";

import Appointments
from "./pages/Appointments";

function AppContent() {

  const location = useLocation();

  const token =
    localStorage.getItem("token");

  return (

    <>

      {/* Hide navbar on login page */}
      {
        token &&
        location.pathname !== "/login" &&

        <Navbar />
      }

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/dashboard"

          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"

          element={
            <ProtectedRoute>

              <Doctors />

            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"

          element={
            <ProtectedRoute>

              <Patients />

            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"

          element={
            <ProtectedRoute>

              <Appointments />

            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;