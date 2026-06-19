import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: 'tw-', 
  theme: {
    extend: {},
  },
  plugins: [
    react(),
    svgr(),
    
     // Tambahkan ini
  ],
   esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // pastikan .jsx dikenali
  },
  
})
