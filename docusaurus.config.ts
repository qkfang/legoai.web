import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LegoAI.net',
  tagline: 'Use AI for LEGO Robotics, combining artificial intelligence with LEGO robotics to tackle real-world challenges using STEM, promoting growth and collaboration. ',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://legoai.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LegoAI', // Usually your GitHub org/user name.
  projectName: 'LegoAI', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 800, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      'docusaurus-plugin-image-zoom', {}
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          postsPerPage: 10,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        gtag: {
          trackingID: 'G-9XS03JTRHQ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'LEGO AI',
      logo: {
        src: 'img/logo.png',
      },
      items: [
        { to: '/blog', label: 'All Blogs', position: 'left' },
        { to: '/blog/tags/ai', label: 'AI & Azure', position: 'left' },
        { to: '/blog/tags/robotics', label: 'Robotics', position: 'left' },
        { to: '/blog/tags/fll', label: 'FLL', position: 'left' },
        { to: '/blog/tags/talk', label: 'Talks', position: 'left' },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
      ],
    },
    zoom: {
      selector: '.img-grid .img-item img',
      background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        {
          title: 'Navigation',
          items: [
            {
              label: 'Tags',
              to: '/blog/tags',
            },
          ],
        },
        {
          title: 'Information',
          items: [
            {
              label: 'About',
              to: '/blog/2022/01/01/about',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LegoAI.net - Loving LEGO Robotics since 2022.`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
