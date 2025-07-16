/// <reference types="vite/client" />

// Declare modules for audio files
declare module '*.mp3' {
  const src: string;
  export default src;
}
