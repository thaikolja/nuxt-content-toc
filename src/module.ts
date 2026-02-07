/**
 * @fileoverview Nuxt Content TOC Module
 * @description A highly customizable and accessible Table of Contents component
 * for @nuxt/content v2 and v3. Provides automatic heading extraction, scroll
 * synchronization, and active section highlighting.
 *
 * @module nuxt-content-toc
 * @author Kolja
 * @license MIT
 */

import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

/**
 * Configuration options for the nuxt-content-toc module.
 *
 * @interface ModuleOptions
 * @description These options can be set in `nuxt.config.ts` under the `contentToc` key.
 *
 * @example
 * ```ts
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['nuxt-content-toc'],
 *   contentToc: {
 *     levels: [2, 3],
 *     activeClass: 'toc-active',
 *     scrollOffset: 100,
 *   },
 * })
 * ```
 */
export interface ModuleOptions {
  /**
   * Heading levels to include in the table of contents.
   * @default [2, 3, 4]
   * @example [2, 3] // Only h2 and h3
   */
  levels?: number[]

  /**
   * CSS class applied to the currently active TOC item.
   * @default 'toc-active'
   */
  activeClass?: string

  /**
   * CSS class applied to each TOC item.
   * @default 'toc-item'
   */
  itemClass?: string

  /**
   * CSS class applied to nested sublists.
   * @default 'toc-sublist'
   */
  sublistClass?: string

  /**
   * CSS class applied to sublist items.
   * @default 'toc-sublist-item'
   */
  sublistItemClass?: string

  /**
   * Offset from the top of the viewport (in pixels) when determining
   * which heading is currently active. Useful for fixed headers.
   * @default 80
   */
  scrollOffset?: number
}

/**
 * Default module options.
 * @internal
 */
const DEFAULT_OPTIONS: Required<ModuleOptions> = {
  levels: [2, 3, 4],
  activeClass: 'toc-active',
  itemClass: 'toc-item',
  sublistClass: 'toc-sublist',
  sublistItemClass: 'toc-sublist-item',
  scrollOffset: 80,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'contentToc',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },

  defaults: DEFAULT_OPTIONS,

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Ensure public runtime config exists and is merged with defaults.
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.contentToc = {
      ...DEFAULT_OPTIONS,
      ...(nuxt.options.runtimeConfig.public.contentToc || {}),
      ...options,
    }

    // Expose package version to runtime via build-time define.
    nuxt.options.vite = nuxt.options.vite || {}
    nuxt.options.vite.define = {
      ...(nuxt.options.vite.define || {}),
      __NUXT_CONTENT_TOC_VERSION__: JSON.stringify(version),
    }

    // Register the TableOfContents component globally
    addComponent({
      name: 'TableOfContents',
      filePath: resolver.resolve('./runtime/components/TableOfContents.vue'),
      global: true,
    })

    // Register composables for auto-import
    addImports([
      { name: 'useContentToc', from: resolver.resolve('./runtime/composables/useContentToc') },
      { name: 'useActiveHeading', from: resolver.resolve('./runtime/composables/useActiveHeading') },
      { name: 'useContentVersion', from: resolver.resolve('./runtime/composables/useContentVersion') },
    ])

    // Ensure runtime is transpiled (module is shipped as TS in dist/runtime)
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // Add the plugin for runtime initialization
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
