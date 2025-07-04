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
            cn('Translating', 1, ['building'], '#94e2d5', './build.html'),

            cn('Context', 2, ['runtime'], '#cba6f7', './context.html'),
            cn('STDLIB', 1, ['context'], '#fab387', './core.html'),
            cn('Core', 1, ['stdlib'], '#fab387', './core.html'),
            cn('Shell', 1, ['stdlib', 'stdio'], '#f9e2af', './exec.html'),
            cn('Env', 1, ['stdlib', 'shell'], '#f9e2af', './env.html'),
            cn('Threads', 1, ['stdlib'], '#a6e3a1', './threads.html'),
            cn('FS', 1, ['conf', 'stdlib'], '#74c7ec', './fs.html'),
            cn('Net', 1, ['stdlib'], '#f5c2e7', './net.html'),
            cn('HTTP', 1, ['stdlib', 'net'], '#f5c2e7', './http.html'),
            
            cn('Directives', 2, ['compiler'], '#fab387', './directives.html'),
            cn('Features', 1, ['directives'], '#a6e3a1', './compiler-directive.html'),
            cn('JSX', 1, ['features'], '#94e2d5', './jsx.html'),

            cn('Using', 1, ['directives'], '#eba0ac', './using.html'),
            cn('Namespaces', 1, ['using'], '#f5e0dc', './namespaces.html'),
            cn('Import/Export', 1, ['compiler'], '#eba0ac', './import-export.html'),
            cn('Declarations', 1, ['directives'], '#b4befe', './declarations.html'),
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
        repoId: "R_kgDOM_vjsQ",
        category: "General", // default: `General`
        categoryId: "DIC_kwDOM_vjsc4CrWDR",
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

