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

import type { ModuleOptions } from './runtime/types'

export type { ModuleOptions }

/**
 * Default module options.
 * @internal
 */
const DEFAULT_OPTIONS: Required<ModuleOptions> = {
  levels: [3, 4],
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
  textColor: '#000000',
  activeColor: '#2563eb',
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

    // Add the CSS globally
    nuxt.options.css = nuxt.options.css || []
    nuxt.options.css.push(resolver.resolve('./runtime/assets/toc.css'))

    // Add the plugin for runtime initialization
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
