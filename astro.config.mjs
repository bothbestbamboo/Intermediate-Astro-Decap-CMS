import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  // update me!
  site: "https://intermediate-astro-kit-decap-cms.netlify.app",

  integrations: [
      icon(),
      sitemap({
          filter: (page) => !page.includes("/admin"),
          changefreq: "weekly",
          priority: 0.7,
      }),
	],

  image: {
      layout: "constrained",
	},

  fonts: [
      {
          provider: fontProviders.google(),
          name: "Roboto",
          cssVariable: "--font-primary",
          fallbacks: ["Arial", "sans-serif"],
          weights: [400, 700, 900],
          styles: ["normal"],
      },
	],

  adapter: cloudflare(),
});