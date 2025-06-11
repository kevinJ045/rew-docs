import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/rew-docs/",
  title: "Rew",
  description: "A simple coffeescript runtime",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/kevinJ045/rew-docs/main/assets/logo.png' }]],
  ignoreDeadLinks: true,
  themeConfig: {

	search: {
    	provider: 'local'
  	},
	
   	nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Starting',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Legacy Rew', link: '/rew-node/' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'App', link: '/app' },
          { text: 'Runtime', link: '/runtime' },
          { text: 'Compiler', link: '/compiler' },
          { text: 'PacMan', link: '/pacman' },
          { text: 'Building', link: '/build' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Core', link: '/core' },
          { text: 'Import-Export', link: '/import-export' },
          { text: 'Threads', link: '/threads' },
          { text: 'Files', link: '/fs' },
          { text: 'Shell', link: '/shell' },
          { text: 'Net', link: '/net' },
          { text: 'HTTP', link: '/http' }
        ]
      },
      {
        text: "Directives",
        link: '/directives',
        items: [
          { text: 'Using', link: '/using' },
          { text: 'Namespaces', link: '/namespaces' },
          { text: 'Compiler', link: '/compiler-directive' },
          { text: 'JSX', link: '/jsx' },
          { text: 'Declarations', link: '/declarations' }
        ]
      },
      {
        text: 'Packages',
        items: [
          { text: 'Pimmy', link: '/pacman' },
        ]
      },
      {
        text: 'Experiments',
        link: '/experiments',
        items: [
          { text: 'Phantom Syntax', link: '/expr/phantom' },
        ]
      },
      {
        text: 'Updates',
        items: [
          { text: 'Update Notes', link: '/updates' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kevinj045/rew' }
    ]
  }
})
