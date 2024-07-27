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
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'App', link: '/app' },
          { text: 'Runtime', link: '/runtime' },
          { text: 'Conf', link: '/conf' },
          { text: 'Building', link: '/build' },
          { text: 'Qrew', link: '/qrew' },
          { text: 'PacMan', link: '/pacman' },
          { text: 'Rogue', link: '/rogue' },
          { text: 'JSX', link: '/jsx' }
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
          { text: 'Shell', link: '/exec' },
          { text: '<s>UI</s>', link: '/ui' },
          { text: 'Rune', link: '/rune' },
          { text: 'Secrets', link: '/secrets' },
          { text: 'Serve', link: '/serve' },
          { text: 'Web', link: '/web' }
        ]
      },
      {
        text: "Directives",
        link: '/compiler-directives',
        items: [
          { text: 'Using', link: '/using' }
        ]
      },
      {
        text: "Compilers",
        items: [
          { text: 'CoffeeScript', link: '/lang-coffee' },
          { text: 'Civet', link: '/lang-civet' },
        ]
      },
      {
        text: 'Code and Intellisense',
        link: '/intellisense',
        items: [
          { text: 'JSDoc', link: '/jsdoc' },
          { text: 'VSCode', link: '/vscode' },
          { text: 'Other Editors', link: '/other-editors' },
          { text: 'Typing', link: '/typing' },
        ]
      },
      {
        text: 'Packages',
        items: [
          { text: 'Pimmy', link: '/packages/pimmy' },
          { text: 'Forge3D', link: '/packages/forge3d' },
          { text: 'GTK', link: '/packages/gtk' },
          { text: 'Rayous', link: '/packages/rayous' },
        ]
      },
      {
        text: 'Experiments',
        link: '/experiments',
        items: [
          { text: 'Phantom Syntax', link: '/expr/phantom' },
          { text: 'Nodify', link: '/expr/nodify' },
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
