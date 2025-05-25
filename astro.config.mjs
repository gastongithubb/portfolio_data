import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tu-dominio.com', // cambia por tu dominio
  integrations: [
    tailwind(),
    sitemap()
  ],
  image: {
    // Configuración nativa de imágenes en Astro 5
    domains: ['github.com', 'raw.githubusercontent.com']
  }
});