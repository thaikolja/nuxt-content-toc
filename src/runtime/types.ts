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

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    contentToc?: Partial<ContentTocRuntimeConfig>
  }
}

export {}
