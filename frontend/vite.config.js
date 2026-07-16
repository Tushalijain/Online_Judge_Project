import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   //Enables React and JSX support
import tailwindcss from '@tailwindcss/vite'    //Processes Tailwind CSS classes

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})