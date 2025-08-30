import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import AudioAnalyzer from "@/components/AudioAnalyzer";

export default function AudioAnalyzerPage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <AudioAnalyzer />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Audio Analyzer | Monorepo Showcase",
  description: "Showcase of Audio Analyzer web app.",
};
