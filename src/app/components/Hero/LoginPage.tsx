"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#4D3CA6] to-[#9E499C]">
      {/* Left Side (Image or Branding) */}
      <div className=" flex items-center justify-center p-10">
        <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
      </div>

      {/* Right Side (Form) */}
      <div className="flex items-center justify-center p-8 ">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login to Your Account</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4D3CA6]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4D3CA6]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-sm text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="w-full bg-[#4D3CA6] hover:bg-[#9E499C] text-white py-2 rounded font-semibold transition">
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-[#4D3CA6] font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
