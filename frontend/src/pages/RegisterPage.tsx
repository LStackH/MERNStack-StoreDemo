import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Register</h1>
      <Register />
      <div className="mt-4 text-gray-400 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
