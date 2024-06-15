// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
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

