// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [vue(), commonjs()],
});
