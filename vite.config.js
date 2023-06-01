import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType:"prompt",
  includeAssets: ["favicon.ico","logo.png"],
  manifest:{
    short_name: "Ani-Play",
    name: "Ani Play",
    icons: [
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      },
      {
        src: "logo.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "logo.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: ".",
    display: "standalone",
    theme_color: "#fff",
    background_color: "#000"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
})
