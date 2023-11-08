import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/react-vite-rest-post-app-with-auth",
    plugins: [react()],
    server: {
        open: true
    }
});
