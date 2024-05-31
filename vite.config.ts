import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'import.meta.env.VITE_CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
  },
})
