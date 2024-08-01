// https://vitepress.dev/guide/custom-theme
import { h, onMounted, ref } from 'vue'
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { useData, useRoute } from "vitepress"
import DefaultTheme from 'vitepress/theme'
import giscusTalk from "vitepress-plugin-comment-with-giscus"
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData()
    const route = useRoute()


    if (route.component.name == 'index.md') {

      onMounted(() => {

        const el = document.querySelector('img[alt="logo"]');
        document.querySelector('.image-bg')?.remove();

        if (el) {

          const graphContainer = document.createElement('div');
          graphContainer.style.width = '100%';
          graphContainer.style.height = '400px';
          // const selectedNode = ref(null);

          const _nodes = [];

          const cn = (title, size = 1, connections = [], color = '#eba0ac', link = '') => ({
            id: title.toLowerCase().replace(/\W/g, '_'),
            label: title,
            font: { color },
            color,
            value: size || 1,
            with: connections,
            linkTo: link
          })

          const trimNode = node => {
            const n = { ...node };
            delete n.with;
            return n;
          }

          _nodes.push(
            cn('App', 5, [], '#cba6f7', './app.html'),
            cn('Compiler', 4, ['app'], '#f38ba8', './compiler-directives.html'),
            cn('Runtime', 3, ['app', 'compiler'], '#f38ba8', './runtime.html'),
            cn('PacMan', 3, ['conf', 'app'], '#f9e2af', './pacman.html'),
            cn('Building', 2, ['compiler'], '#89b4fa', './build.html'),
            cn('QRew', 1, ['building!'], '#89b4fa', './qrew.html'),
            cn('Translating', 1, ['building'], '#94e2d5', './build.html#translating-to-js'),
            cn('Rogue', 1, ['runtime'], '#f2cdcd', './rogue.html'),

            cn('Context', 2, ['runtime'], '#cba6f7', './context.html'),
            cn('STDLIB', 2, ['context'], '#f38ba8', './stdlib.html'),
            cn('STDIO', 1, ['stdlib'], '#fab387'),
            cn('Core', 1, ['stdlib'], '#fab387', './core.html'),
            cn('Shell', 1, ['stdlib', 'stdio'], '#f9e2af', './exec.html'),
            cn('Env', 1, ['stdlib', 'shell'], '#f9e2af', './env.html'),
            cn('Threads', 1, ['stdlib'], '#a6e3a1', './threads.html'),
            cn('FS', 1, ['conf', 'stdlib'], '#74c7ec', './fs.html'),
            cn('Conf', 1, ['stdlib', 'app'], '#74c7ec', './conf.html'),
            cn('Rune', 1, ['conf'], '#eba0ac', './rune.html'),
            cn('Secrets', 1, ['rune'], '#f9e2af', './secrets.html'),
            cn('Serve', 1, ['stdlib'], '#f5c2e7', './serve.html'),
            cn('Web', 1, ['stdlib', 'serve'], '#f5c2e7', './web.html'),

            cn('Civet', 2, ['compiler', 'import_export'], '#74c7ec', './lang-civet.html'),
            cn('Coffee', 1, ['compiler', 'import_export'], '#f9e2af', './lang-coffee'),
            cn('YAML', 1, ['import_export'], '#f38ba8', './import-export.html'),
            cn('JSON', 1, ['import_export'], '#fab387', './import-export.html'),

            cn('Rew', 2, ['civet', 'coffee'], '#cba6f7', './intellisense.html'),
            cn('Directives', 2, ['rew'], '#fab387', './compiler-directives.html'),
            cn('Features', 1, ['rew'], '#a6e3a1', './compiler-directives.html'),
            cn('JSX', 1, ['features'], '#94e2d5', './jsx.html'),
            cn('Types', 1, ['features'], '#74c7ec', './types.html'),
            cn('ExecOptions', 1, ['compiler', 'directives'], '#b4befe', './options.html'),
            cn('JS', 1, ['rew!', 'import_export'], '#f9e2af', './build.html#translating-to-js'),

            cn('Using', 1, ['directives'], '#eba0ac', './using.html'),
            cn('Namespaces', 1, ['using'], '#f5e0dc', './using.html#usage-namespaces'),
            cn('Import/Export', 1, ['compiler'], './import-export.html'),
            cn('Phantom', 1, ['directives'], '#b4befe', './expr/phantom.html'),

            cn('Headers', 1, ['phantom'], '#89dceb', './expr/phantom.html#header-coffee-files'),
            cn('Declarators', 1, ['phantom'], '#f2cdcd', './expr/phantom.html#declarators'),
            cn('Tokenizers', 1, ['phantom'], '#f5e0dc', './expr/phantom.html#declaration'),

            cn('Packages', 2, ['pacman'], '#94e2d5'),
            cn('Pimmy', 2, ['packages'], '#f38ba8', './packages/pimmy.html'),
            cn('Forge3D', 2, ['packages'], '#89b4fa', './packages/forge3d.html'),
            cn('GTK', 2, ['packages'], '#f5c2e7', './packages/gtk.html'),
            cn('Rayous', 2, ['packages'], '#cba6f7', './packages/rayous.html'),
          );

          const nodes = new DataSet(
            _nodes.map(trimNode)
          );

          // nodes.

          const edges = new DataSet(
            _nodes.flatMap(
              node => node.with.map(id => [node.id, id.replace(/^!/, '').replace(/!$/, ''), node.color, id.startsWith('!') ? 'to' : id.endsWith('!') ? 'from' : null])
            ).map(con => ({ from: con[0], to: con[1], color: con[2], arrows: con[3] ?? null }))
          );

          const data = {
            nodes: nodes,
            edges: edges
          };

          const options = {
            nodes: {
              shape: 'dot',
              size: 16,
              color: '#eba0ac',
              font: { color: 'white' }
            },
            edges: {
              color: '#f38ba8'
            },
          };

          const network = new Network(graphContainer, data, options);

          let selectedNode;


          network.on('click', (params) => {
            const nodeId = params.nodes[0];
            const node = nodes.get(nodeId);
            if(selectedNode?.id == node.id){
              if(selectedNode?.linkTo) location.href = selectedNode?.linkTo;
            }
            selectedNode = node;
          });

          el.insertAdjacentElement('beforebegin', graphContainer);

          network.once('stabilizationIterationsDone', () => {
            network.focus('app', {
              scale: 1, // Adjust scale as needed
              animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad'
              }
            });
          });

          el.remove();
        }
      });
    }

    // Obtain configuration from: https://giscus.app/
    giscusTalk(
      {
        repo: "kevinj045/rew",
        repoId: "R_kgDOL_wH4Q",
        category: "General", // default: `General`
        categoryId: "DIC_kwDOL_wH4c4CgG6I",
        mapping: "pathname", // default: `pathname`
        inputPosition: "bottom", // default: `top`
        lang: "en", // default: `zh-CN`
        loading: "lazy",
        theme: "https://giscus.catppuccin.com/themes/mocha.css",
        reactionsEnabled: true
        // ...
      },
      {
        frontmatter,
        route,
      },
      // Whether to activate the comment area on all pages.
      // The default is true, which means enabled, this parameter can be ignored;
      // If it is false, it means it is not enabled.
      // You can use `comment: true` preface to enable it separately on the page.
      true
    )
  }
}

