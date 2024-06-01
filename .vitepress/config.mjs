import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/rew-docs/",
  title: "Rew",
  description: "A simple coffeescript runtime",
  head: [['link', { rel: 'icon', href: '/rew-docs/assets/logo.png' }]],
  themeConfig: {

	search: {
    	provider: 'local'
  	},
	
   	nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Starting',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'App', link: '/app' },
          { text: 'Runtime', link: '/runtime' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Core', link: '/core' },
          { text: 'Context', link: '/context' },
          { text: 'Import-Export', link: '/import-export' },
          { text: 'Options', link: '/opt' },
          { text: 'Env', link: '/env' },
          { text: 'Threads', link: '/threads' },
          { text: 'Files', link: '/fs' },
          { text: 'Shell', link: '/exec' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kevinj045/rew' }
    ]
  }
})
