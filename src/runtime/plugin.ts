/**
 * @fileoverview Nuxt Content TOC Plugin
 * @description Runtime plugin for the nuxt-content-toc module.
 * Initializes the module and provides global access to TOC utilities.
 *
 * @module plugin
 */

import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { ContentTocRuntimeConfig } from './types'

const DEFAULTS: ContentTocRuntimeConfig = {
  levels: [2, 3, 4],
  activeClass: 'toc-active',
  itemClass: 'toc-item',
  sublistClass: 'toc-sublist',
  sublistItemClass: 'toc-sublist-item',
  scrollOffset: 80,
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  activeFontWeight: 600,
  borderWidth: '2px',
  indentSize: '1.25rem',
  align: 'left',
}

/**
 * Nuxt Content TOC Plugin
 *
 * @description
 * This plugin runs at application startup and provides:
 * - Access to module configuration via `$contentToc`
 * - Module initialization logging (in development)
 *
 * @example
 * ```ts
 * // Access in a component
 * const { $contentToc } = useNuxtApp()
 * console.log($contentToc.config.activeClass)
 * ```
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const moduleConfig = { ...DEFAULTS, ...(config.public.contentToc || {}) }

  // Provide module utilities globally
  return {
    provide: {
      contentToc: {
        /**
         * Module configuration
         */
        config: moduleConfig,

        /**
         * Module version
         */
        // replaced at build time by unbuild/rollup define (see module.ts)
        version: (globalThis as Record<string, unknown>).__NUXT_CONTENT_TOC_VERSION__ as string || __NUXT_CONTENT_TOC_VERSION__ || '0.0.0',
      },
    },
  }
})
