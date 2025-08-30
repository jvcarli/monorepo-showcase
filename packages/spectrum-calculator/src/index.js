import FFT from "fft.js";

/**
 * Decode audio file into PCM samples (Float32Array)
 * @param {File|Blob} file - Browser File or Blob
 * @returns {Promise<Float32Array>}
 */
export async function decodeAudio(file) {
  if (!file || !file.arrayBuffer) {
    throw new Error("decodeAudio: argument must be a File or Blob");
  }

  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer.getChannelData(0); // first channel only
}

/**
 * Compute FFT magnitude spectrum
 * @param {Float32Array} samples
 * @returns {Float32Array} magnitude spectrum
 */
export function computeSpectrum(samples) {
  // Find nearest lower power of two
  let N = samples.length;
  N = 2 ** Math.floor(Math.log2(N));
  if (N < 2) throw new Error("FFT size must be >= 2");

  const fft = new FFT(N);
  const out = fft.createComplexArray();
  fft.realTransform(out, samples.subarray(0, N));
  fft.completeSpectrum(out);

  const mags = new Float32Array(N / 2);
  for (let i = 0; i < N / 2; i++) {
    const re = out[2 * i];
    const im = out[2 * i + 1];
    mags[i] = Math.sqrt(re * re + im * im);
  }
  return mags;
}

/**
 * Normalize data to 0..1
 * @param {Float32Array|number[]} data
 * @returns {Float32Array|number[]}
 */
export function normalize(data) {
  const max = Math.max(...data);
  if (max === 0) return data;
  return data.map((v) => v / max);
}
