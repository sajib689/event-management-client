/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // optional for notifications
import { useLoginUserMutation } from "@/redux/api/user/userApi";
import { useDispatch } from "react-redux";
import { login } from "@/redux/auth/userSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const dispatch = useDispatch();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await loginUser(formData).unwrap();

    const { accessToken, refreshToken, user } = res?.user || {};

    // ✅ Dispatch to Redux
    dispatch(
      login({
        user,
        accessToken,
        refreshToken,
      })
      
    );

    toast.success("Login successful!");

    // Redirect user
    router.push("/");
  } catch (error: any) {
    toast.error(error?.data?.message || "Login failed!");
  }
};


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#4D3CA6] to-[#9E499C]">
      {/* Left Side (Image or Branding) */}
      <div className="flex items-center justify-center p-10">
        <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
      </div>

      {/* Right Side (Form) */}
      <div className="flex items-center justify-center p-8 ">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4D3CA6]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4D3CA6] hover:bg-[#9E499C] text-white py-2 rounded font-semibold transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#4D3CA6] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
