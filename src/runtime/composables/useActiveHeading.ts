/**
 * @fileoverview Active Heading Observer Composable
 * @description Tracks which heading is currently visible in the viewport
 * using IntersectionObserver for efficient scroll synchronization.
 *
 * @module useActiveHeading
 */

import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import type { Ref } from 'vue'
import { useRuntimeConfig } from '#app'
import type { ContentTocRuntimeConfig, UseActiveHeadingOptions } from '../types'

/**
 * Tracks the currently active heading based on scroll position.
 *
 * @description
 * Uses the IntersectionObserver API to efficiently detect which heading
 * is currently visible in the viewport. The active heading ID is returned
 * as a reactive ref that updates automatically as the user scrolls.
 *
 * @param headingIds - Reactive array of heading IDs to observe
 * @param options - Configuration options for the observer
 * @returns Reactive ref containing the currently active heading ID
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { headingIds } = useContentToc()
 * const activeId = useActiveHeading(headingIds)
 *
 * const isActive = (id: string) => activeId.value === id
 * </script>
 * ```
 */
export function useActiveHeading(
  headingIds: Ref<string[]>,
  options: UseActiveHeadingOptions = {},
): Ref<string | null> {
  const config = useRuntimeConfig()

  const moduleOptions = (config.public.contentToc || {}) as Partial<ContentTocRuntimeConfig>

  const offsetTop = options.offsetTop ?? moduleOptions.scrollOffset ?? 80
  const rootMargin = computed(() => options.rootMargin ?? `-${offsetTop}px 0px -80% 0px`)

  // Currently active heading ID
  const activeId = ref<string | null>(null)

  // Store the IntersectionObserver instance
  let observer: IntersectionObserver | null = null

  // Track visible headings for priority calculation
  const visibleHeadings = new Map<string, IntersectionObserverEntry>()

  /**
   * Determines which heading should be considered "active" based on
   * visibility and position in the viewport.
   * @internal
   */
  function updateActiveHeading() {
    if (visibleHeadings.size === 0) {
      // No headings visible, keep the last active one
      return
    }

    // Get all visible headings sorted by their position in the document
    const sortedVisibleIds = [...visibleHeadings.entries()]
      .sort(([, a], [, b]) => {
        const aRect = a.boundingClientRect
        const bRect = b.boundingClientRect
        return aRect.top - bRect.top
      })
      .map(([id]) => id)

    // The topmost visible heading is the active one
    if (sortedVisibleIds.length > 0) {
      activeId.value = sortedVisibleIds[0] || null
    }
  }

  /**
   * Sets up the IntersectionObserver to track heading visibility.
   * @internal
   */
  function setupObserver() {
    if (import.meta.server) {
      return
    }

    // Clean up existing observer
    if (observer) {
      observer.disconnect()
      visibleHeadings.clear()
    }

    // Don't setup if no headings to observe
    if (headingIds.value.length === 0) {
      activeId.value = null
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id

          if (entry.isIntersecting) {
            visibleHeadings.set(id, entry)
          }
          else {
            visibleHeadings.delete(id)
          }
        }

        updateActiveHeading()
      },
      {
        rootMargin: rootMargin.value,
        threshold: [0, 0.5, 1],
      },
    )

    // Observe all heading elements
    for (const id of headingIds.value) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    // Set initial active heading (first one if any)
    if (headingIds.value.length > 0 && !activeId.value) {
      activeId.value = headingIds.value[0] || null
    }
  }

  // Setup observer when component is mounted
  onMounted(async () => {
    await nextTick()
    setupObserver()
  })

  // Cleanup observer when component is unmounted
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    visibleHeadings.clear()
  })

  // Re-setup observer when heading IDs change
  watch(
    [headingIds, rootMargin],
    async () => {
      await nextTick()
      setupObserver()
    },
    { deep: true },
  )

  return activeId
}

export default useActiveHeading
