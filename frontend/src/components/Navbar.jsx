import { Link, useNavigate }
from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <nav className="
      bg-blue-700
      shadow-lg
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
      ">

        <h1 className="
          text-white
          text-2xl
          font-bold
        ">
          Hospital Management System
        </h1>

        <div className="
          flex
          items-center
          gap-6
          text-white
        ">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/doctors">
            Doctors
          </Link>

          <Link to="/patients">
            Patients
          </Link>

          <Link to="/appointments">
            Appointments
          </Link>

          <button
            onClick={logout}

            className="
              bg-red-500
              px-4
              py-2
              rounded-lg
            "
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;