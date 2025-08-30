"use client";

import LoginForm from "@/components/LoginForm";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* Left panel */}
      <div className="hidden border-r border-gray-700 bg-gray-100 xl:flex xl:flex-1"></div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
