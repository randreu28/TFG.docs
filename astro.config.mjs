import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import customTheme from './ocean-tokyo-dark.json';
import preact from "@astrojs/preact";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  markdown: {
    shikiConfig: {
      // @ts-ignore
      theme: customTheme
    }
  },
  output: "server",
  adapter: vercel()
});