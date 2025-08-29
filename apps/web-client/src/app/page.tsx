"use client";

import LoginForm from "../components/LoginForm";

export default function HomePage() {
  return (
    <div className="h-screen flex">
      {/* Left panel */}
      <div className="flex-1 bg-gray-200 flex"></div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
