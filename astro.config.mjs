import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import customTheme from './ocean-tokyo-dark.json';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      // @ts-ignore
      theme: customTheme,
    }
  }
});