import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import customTheme from './ocean-tokyo-dark.json';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  markdown: {
    shikiConfig: {
      // @ts-ignore
      theme: customTheme
    }
  }
});