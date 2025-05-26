import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-data-xi.vercel.app/',
  integrations: [
    sitemap(),
  ],
  image: {
    domains: ['github.com', 'raw.githubusercontent.com']
  }
});