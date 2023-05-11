// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/nightOwlLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TFG docs",
  tagline: "Gallery of interactive applications with 3D components",
  favicon: "img/logo.svg",

  // Set the production url of your site here
  url: "https://tfg-docs.vercel.app/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "TFG Docs",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Docs",
          },
          {
            href: "/",
            label: "What is this?",
            position: "left",
          },
          {
            href: "/showcase",
            label: "Showcase",
            position: "left",
          },
          {
            href: "https://github.com/randreu28",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Info",
            items: [
              {
                label: "What is this?",
                to: "/",
              },
              {
                label: "Showcase",
                to: "/showcase",
              },
            ],
          },
          {
            title: "Repositories",
            items: [
              {
                label: "TriArt",
                href: "https://github.com/randreu28/TFG.triart",
              },
              {
                label: "Halo inspector",
                href: "https://github.com/randreu28/TFG.halo-inspector",
              },
              {
                label: "Particle showcase",
                href: "https://github.com/randreu28/TFG.particle-showcase",
              },
              {
                label: "Product page",
                href: "https://github.com/randreu28/TFG.product-page",
              },
            ],
          },
          {
            title: " ",
            items: [
              {
                label: "Mirror effect",
                href: "https://github.com/randreu28/TFG.mirror-effect",
              },
              {
                label: "Buckle up",
                href: "https://github.com/randreu28/TFG.buckle-up",
              },
              {
                label: "Talking stars",
                href: "https://github.com/randreu28/TFG.talking-stars",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "My github profile",
                href: "https://github.com/randreu28",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TFG.docs. All Rights Reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
