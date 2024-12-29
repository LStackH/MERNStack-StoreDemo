import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Forms/Login";

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
      <Login />
      <div className="mt-4 text-gray-400 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
