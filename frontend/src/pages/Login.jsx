import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../conponents/Context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Single auth endpoint
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const role = data.user?.role || data.role || "user";
        const id = data.user?.id || data.user?._id || data.id || data._id;

        login(data.token, role, id);

        if (role === "admin") {
          navigate("/superadmin");
        } else {
          navigate("/");
        }

        return;
      }

      // Handle error message from backend
      setError(data.message || "Invalid email or password");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-left text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#F1BC00] hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="mt-5 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#F1BC00] font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="mt-2 text-sm text-center">
          <Link to="/forgetpassword" className="text-[#F1BC00] hover:underline">
            Forgot Password?
          </Link>
        </p>
        <p className="mt-2 text-sm text-center">
          <Link
            to="/driver/signup"
            className="text-[#F1BC00] font-medium hover:underline"
          >
            Join as Driver
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
