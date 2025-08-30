"use client";

import LoginForm from "@/components/LoginForm";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* Left panel */}
      <div className="hidden bg-gray-200 xl:flex xl:flex-1"></div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
