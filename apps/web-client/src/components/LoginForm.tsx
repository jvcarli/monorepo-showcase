"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fakeUser = {
    email: "user@example.com",
    password: "123456",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === fakeUser.email && password === fakeUser.password) {
      router.push("/audio-analyzer");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-sm rounded border border-gray-700 bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-gray-700 p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-gray-700 p-2"
          required
        />
        <button
          type="submit"
          className="rounded bg-orange-500 py-2 text-white hover:bg-orange-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
