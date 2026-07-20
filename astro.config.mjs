import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cateringmakyo.site',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
