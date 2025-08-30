"use client";
import { useState, useRef, DragEvent } from "react";
import { decodeAudio, computeSpectrum } from "@company/spectrum-calculator";

interface AudioFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export default function AudioAnalyzer() {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const audioFiles: AudioFile[] = Array.from(files)
      .filter((file) => file.type.startsWith("audio/"))
      .map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      }));
    setAudios((prev) => [...prev, ...audioFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // --- Offscreen Canvas helpers ---
  const drawWaveform = (samples: Float32Array, width = 800, height = 400) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#ff6600";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const step = samples.length / width;
    for (let i = 0; i < width; i++) {
      const v = samples[Math.floor(i * step)];
      const y = (1 - (v + 1) / 2) * height;
      if (i === 0) ctx.moveTo(i, y);
      else ctx.lineTo(i, y);
    }
    ctx.stroke();
    return canvas;
  };

  const drawSpectrum = (spectrum: Float32Array, width = 800, height = 400) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#0066ff";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const step = spectrum.length / width;
    const maxVal = Math.max(...spectrum) || 1; // prevent divide by 0
    for (let i = 0; i < width; i++) {
      const v = spectrum[Math.floor(i * step)] / maxVal;
      const y = height - v * height;
      if (i === 0) ctx.moveTo(i, y);
      else ctx.lineTo(i, y);
    }
    ctx.stroke();
    return canvas;
  };

  const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  };

  // --- Download all audios ---
  const handleDownload = async () => {
    for (const audio of audios) {
      try {
        const samples = await decodeAudio(audio.file);
        const spectrum = computeSpectrum(samples);

        const waveformCanvas = drawWaveform(samples);
        const spectrumCanvas = drawSpectrum(spectrum);

        if (waveformCanvas)
          downloadCanvas(waveformCanvas, `${audio.name}-waveform.png`);
        if (spectrumCanvas)
          downloadCanvas(spectrumCanvas, `${audio.name}-spectrum.png`);
      } catch (err) {
        console.error(`Failed to process ${audio.name}`, err);
      }
    }
  };

  return (
    <div className="flex min-h-0 flex-1">
      {/* Left 2/3: Drop area */}
      <div
        className="flex w-2/3 cursor-pointer items-center justify-center border-r border-gray-700 bg-gray-100 p-8 text-center transition hover:border-gray-700"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {audios.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-700 p-36 text-lg">
            Drop your audios or click here
          </div>
        ) : (
          <div className="text-lg">
            {audios.length} audio file{audios.length > 1 ? "s" : ""} loaded.
          </div>
        )}
      </div>

      {/* Right 1/3: Info panel */}
      <div className="flex min-h-0 w-1/3 flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {audios.length === 0 ? (
            <div className="space-y-4">
              <p>
                Welcome to the <strong>Audio Analyzer</strong> app!
              </p>
              <p>Upload or drag-and-drop audio files into the interface.</p>
              <p>
                Once loaded, you can compute the waveform and frequency spectrum
                and download them as PNG images.
              </p>
            </div>
          ) : (
            audios.map((audio, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-700 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold">{audio.name}</p>
                <p className="text-sm text-gray-700">
                  {formatSize(audio.size)} · {audio.type}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Bottom fixed: download button */}
        <div className="flex h-28 items-center justify-center border-t border-gray-700">
          <button
            onClick={handleDownload}
            className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-orange-500 p-4 px-6 text-2xl font-bold text-white hover:bg-orange-700"
          >
            <span>Download</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
