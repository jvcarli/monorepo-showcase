"use client";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-700 p-4">
      <a
        href="/monorepo-showcase/audio-analyzer"
        className="cursor-pointer text-2xl font-extrabold text-orange-500"
      >
        Audio Analyzer
      </a>
      <div className="flex items-center space-x-4 text-white">
        <button className="flex cursor-pointer items-center space-x-1 rounded-lg bg-orange-500 p-2 hover:bg-orange-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="font-bold">Upgrade to premium!</div>
        </button>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm font-bold hover:bg-gray-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
