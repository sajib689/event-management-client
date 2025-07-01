/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRegisterUserMutation } from "@/redux/api/user/userApi";

async function uploadImageToImgbb(imageFile: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=f5330ca78c6f9960d5308d89956366a7",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.display_url;
    } else {
      console.error("Image upload error", data);
      return null;
    }
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
}

export default function RegisterPage() {
    const [registerUser] = useRegisterUserMutation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    let photoURL = "";

    if (photo) {
      const uploadedUrl = await uploadImageToImgbb(photo);
      if (!uploadedUrl) {
        toast.error("Image upload failed");
        setIsLoading(false);
        return;
      }
      photoURL = uploadedUrl;
    }

    const registerPayload = {
      ...formData,
      img: photoURL,
    };

    // Call RTK Query mutation and unwrap
 await registerUser(registerPayload).unwrap();

    // If no error, success
    toast.success("Registration successful!");
    router.push("/auth/login");
  } catch (error: any) {
    toast.error(error?.data?.message || error.message || "Registration failed!");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#9E499C] to-[#4D3CA6]">
      {/* Left Side */}
      <div className="flex items-center justify-center p-10">
        <h1 className="text-white text-4xl font-bold text-center">
          Create Your Account
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9E499C]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9E499C]"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9E499C]"
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

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#9E499C] hover:bg-[#4D3CA6] text-white py-2 rounded font-semibold transition disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#9E499C] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
