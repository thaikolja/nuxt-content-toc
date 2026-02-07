/**
 * @fileoverview Content TOC Extraction Composable
 * @description Extracts Table of Contents data from @nuxt/content documents.
 * Supports both v2 and v3 of the content module with automatic version detection.
 *
 * @module useContentToc
 */

import { ref, computed, watch, isRef, unref } from 'vue'
import { useRoute, useRuntimeConfig } from '#app'
import type { ContentTocRuntimeConfig, TocItem, UseContentTocReturn } from '../types'

/**
 * Raw content link structure from @nuxt/content.
 * @internal
 */
interface ContentLink {
  id: string
  depth?: number
  level?: number
  text: string
  children?: ContentLink[]
}

/**
 * Content document structure from @nuxt/content.
 * @internal
 */
interface ContentDocument {
  body?: {
    toc?: {
      links?: ContentLink[]
    }
  }
  toc?: {
    links?: ContentLink[]
  }
}

async function loadContentModule() {
  // Access query functions from global scope (auto-imported by Nuxt)
  if (typeof globalThis !== 'undefined') {
    const g = globalThis as Record<string, unknown>

    return {
      queryCollection: g.queryCollection as ((name: string) => { path: (p: string) => { first: () => Promise<ContentDocument | null> } }) | undefined,
      queryContent: g.queryContent as ((path: string) => { findOne: () => Promise<ContentDocument | null> }) | undefined,
    }
  }

  return null
}

/**
 * Normalizes TOC data from @nuxt/content v2 format.
 *
 * @param links - The links array from v2's `body.toc.links`
 * @param levels - Heading levels to include
 * @returns Normalized TocItem array
 * @internal
 */
function normalizeV2Toc(links: ContentLink[], levels: number[]): TocItem[] {
  if (!Array.isArray(links)) return []

  return links
    .filter(link => levels.includes(link.depth ?? 0))
    .map(link => ({
      id: link.id,
      depth: link.depth ?? 0,
      text: link.text,
      children: link.children ? normalizeV2Toc(link.children, levels) : undefined,
    }))
}

/**
 * Normalizes TOC data from @nuxt/content v3 format.
 *
 * @param links - The links array from v3's body.toc.links
 * @param levels - Heading levels to include
 * @param currentDepth - Current nesting depth (starts at 2 for h2)
 * @returns Normalized TocItem array
 * @internal
 */
function normalizeV3Toc(links: ContentLink[], levels: number[], currentDepth = 2): TocItem[] {
  if (!Array.isArray(links)) {
    return []
  }

  const mapped = links.map((item) => {
    // v3 may use 'depth' or infer from nesting level
    const itemDepth = item.depth ?? item.level ?? currentDepth

    if (!levels.includes(itemDepth)) {
      return null
    }

    const children = item.children ? normalizeV3Toc(item.children, levels, currentDepth + 1) : undefined

    return {
      id: item.id,
      depth: itemDepth,
      text: item.text,
      ...(children?.length ? { children } : {}),
    } satisfies TocItem
  })

  return mapped.filter((v): v is TocItem => v !== null)
}

/**
 * Flattens a hierarchical TocItem array to extract all heading IDs.
 *
 * @param items - Array of TocItem objects
 * @returns Flat array of heading IDs
 * @internal
 */
function flattenHeadingIds(items: TocItem[]): string[] {
  const ids: string[] = []

  for (const item of items) {
    ids.push(item.id)
    if (item.children) {
      ids.push(...flattenHeadingIds(item.children))
    }
  }

  return ids
}

/**
 * Extracts Table of Contents data from the current @nuxt/content document.
 *
 * @description
 * This composable automatically detects the @nuxt/content version and
 * extracts heading data appropriately:
 *
 * - **v3**: Uses `queryCollection().path().first()` to fetch content
 * - **v2**: Uses `queryContent().findOne()` to fetch content
 *
 * The returned TOC is normalized to a consistent `TocItem[]` format.
 *
 * @param pathOrContent - Optional path or content object. if object, uses it directly.
 * @returns {UseContentTocReturn} Reactive TOC data and utilities
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { data } = await useAsyncData('page', () => queryContent('/').findOne())
 * const { toc } = useContentToc(data)
 * </script>
 * ```
 */
export function useContentToc(pathOrContent?: string | Record<string, unknown>): UseContentTocReturn {
  const route = useRoute()
  const config = useRuntimeConfig()

  const options = (config.public.contentToc || {}) as Partial<ContentTocRuntimeConfig>
  const levels = options.levels || [2, 3, 4]

  // Reactive state
  const toc = ref<TocItem[]>([])
  const pending = ref(true)
  const error = ref<Error | null>(null)

  // Computed flat list of heading IDs for scroll observation
  const headingIds = computed(() => flattenHeadingIds(toc.value))

  /**
   * Fetches and normalizes TOC data from the content.
   */
  async function fetchToc() {
    pending.value = true
    error.value = null

    try {
      const provided = unref(pathOrContent as string | Record<string, unknown> | undefined)

      // If content object is provided directly, use it
      if (typeof provided === 'object' && provided !== null) {
        const content = provided as ContentDocument
        const links = content.body?.toc?.links || content.toc?.links

        if (Array.isArray(links)) {
          toc.value = normalizeV3Toc(links, levels)
        }
        else {
          toc.value = []
        }

        return
      }

      // Otherwise fetch by path
      const contentPath = (typeof provided === 'string' ? provided : undefined) || route.path

      const contentModule = await loadContentModule()

      if (contentModule?.queryCollection) {
        const content = await contentModule.queryCollection('content').path(contentPath).first()

        if (content?.body?.toc?.links) {
          toc.value = normalizeV3Toc(content.body.toc.links, levels)
        }
        else if (content?.toc?.links) {
          toc.value = normalizeV3Toc(content.toc.links, levels)
        }
        else {
          toc.value = []
        }
      }
      else if (contentModule?.queryContent) {
        const content = await contentModule.queryContent(contentPath).findOne()

        if (content?.body?.toc?.links) {
          toc.value = normalizeV2Toc(content.body.toc.links, levels)
        }
        else {
          toc.value = []
        }
      }
      else {
        toc.value = []
      }
    }
    catch (err) {
      // Capture error in reactive ref for component handling
      error.value = err instanceof Error ? err : new Error('Failed to fetch TOC')
      toc.value = []
    }
    finally {
      pending.value = false
    }
  }

  /**
   * Refresh TOC data manually.
   */
  async function refresh() {
    await fetchToc()
  }

  // Watch for route changes or input changes
  watch(
    [() => route.path, () => (isRef(pathOrContent) ? pathOrContent.value : pathOrContent)],
    () => {
      fetchToc()
    },
    { immediate: true },
  )

  return {
    toc,
    headingIds,
    pending,
    error,
    refresh,
  }
}

export default useContentToc
