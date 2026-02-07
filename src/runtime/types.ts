/**
 * @fileoverview Table of Contents Item Type Definitions
 * @description Shared types for the Table of Contents component and composables.
 *
 * @module types
 */

// Import Vue types for proper typing
import type { Ref, ComputedRef } from 'vue'

// Public module options shape exposed at runtime
export interface ContentTocRuntimeConfig {
  levels: number[]
  activeClass: string
  itemClass: string
  sublistClass: string
  sublistItemClass: string
  scrollOffset: number
  // Styling options
  fontFamily: string
  fontWeight: string | number
  activeFontWeight: string | number
  borderWidth: string
  indentSize: string
  align: 'left' | 'center' | 'right' | boolean
  textColor: string
  activeColor: string
}

/**
 * Represents a single item in the Table of Contents.
 *
 * @interface TocItem
 * @description A normalized heading structure that works with both
 * @nuxt/content v2 and v3 data formats.
 */
export interface TocItem {
  /**
   * Unique identifier for the heading, used as the anchor link target.
   * Corresponds to the `id` attribute of the heading element in the DOM.
   * @example 'introduction'
   */
  id: string

  /**
   * The depth/level of the heading (2 for h2, 3 for h3, etc.).
   * @example 2
   */
  depth: number

  /**
   * The text content of the heading.
   * @example 'Introduction'
   */
  text: string

  /**
   * Optional nested child headings.
   * Used for hierarchical TOC structures.
   */
  children?: TocItem[]
}

/**
 * Return type for the useContentToc composable.
 *
 * @interface UseContentTocReturn
 */
export interface UseContentTocReturn {
  /**
   * Reactive array of TOC items extracted from the current content.
   */
  toc: Ref<TocItem[]>

  /**
   * Flat array of all heading IDs for scroll observation.
   */
  headingIds: ComputedRef<string[]>

  /**
   * Loading state while fetching content.
   */
  pending: Ref<boolean>

  /**
   * Error state if content fetch fails.
   */
  error: Ref<Error | null>

  /**
   * Refresh the TOC data.
   */
  refresh: () => Promise<void>
}

/**
 * Options for the useActiveHeading composable.
 *
 * @interface UseActiveHeadingOptions
 */
export interface UseActiveHeadingOptions {
  /**
   * Offset from the top of the viewport when determining active heading.
   * @default 80
   */
  offsetTop?: number

  /**
   * Root margin for the IntersectionObserver.
   * @default '-80px 0px -80% 0px'
   */
  rootMargin?: string
}

// ---- Nuxt type augmentation (app injection + runtimeConfig typing) ----

declare module '#app' {
  interface RuntimeNuxtApp {
    $contentToc: {
      config: ContentTocRuntimeConfig
      version: string
    }
  }
}

/**
 * Configuration options for the nuxt-content-toc module.
 *
 * @interface ModuleOptions
 * @description These options can be set in `nuxt.config.ts` under the `contentToc` key.
 */
export interface ModuleOptions {
  /**
   * Heading levels to include in the table of contents.
   * @default [2, 3, 4]
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

  /**
   * Font family for the TOC items.
   * @default 'inherit'
   */
  fontFamily?: string

  /**
   * Default font weight for TOC items.
   * @default 'inherit'
   */
  fontWeight?: string | number

  /**
   * Font weight for the active TOC item.
   * @default 600
   */
  activeFontWeight?: string | number

  /**
   * Width of the left indicator border.
   * @default '2px'
   */
  borderWidth?: string

  /**
   * Indentation size for nested items.
   * @default '1.25rem'
   */
  indentSize?: string

  /**
   * Horizontal alignment of the TOC.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | boolean

  /**
   * Default text color for TOC items.
   * @default '#000000'
   */
  textColor?: string

  /**
   * Highlight/active color for TOC items.
   * @default '#2563eb' (Blue)
   */
  activeColor?: string
}

// Nuxt type augmentation
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    contentToc: ContentTocRuntimeConfig
  }

  interface NuxtConfig {
    contentToc?: Partial<ModuleOptions>
  }

  interface NuxtOptions {
    contentToc: ModuleOptions
  }
}

declare global {
  const __NUXT_CONTENT_TOC_VERSION__: string
}

export {}
