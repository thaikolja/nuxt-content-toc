<!--
  @fileoverview TableOfContents Vue Component
  @description A highly customizable and accessible Table of Contents component
  for @nuxt/content. Automatically extracts headings from content and provides
  scroll synchronization with active heading highlighting.

  @component TableOfContents
  @requires @nuxt/content v2 or v3

  @example
  <template>
    <TableOfContents />
  </template>

  @example
  <template>
    <TableOfContents
      :levels="[2, 3]"
      active-class="my-active-class"
      :scroll-offset="100"
    />
  </template>
-->

<script setup lang="ts">
/**
 * TableOfContents Component Props
 *
 * @description All props are optional and will fall back to module-level
 * configuration or sensible defaults.
 */

import { computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useContentToc } from '../composables/useContentToc'
import { useActiveHeading } from '../composables/useActiveHeading'
import type { TocItem } from '../types'

// Import default styles
import '../assets/toc.css'

/**
 * Component props interface with comprehensive documentation.
 */
interface Props {
  /**
   * Heading levels to include in the table of contents.
   * Numbers correspond to heading tags (2 = h2, 3 = h3, etc.)
   * @default [2, 3, 4] (from module config)
   */
  levels?: number[]

  /**
   * CSS class applied to the currently active TOC item.
   * @default 'toc-active' (from module config)
   */
  activeClass?: string

  /**
   * CSS class applied to each TOC item.
   * @default 'toc-item' (from module config)
   */
  itemClass?: string

  /**
   * CSS class applied to nested sublists.
   * @default 'toc-sublist' (from module config)
   */
  sublistClass?: string

  /**
   * CSS class applied to sublist items.
   * @default 'toc-sublist-item' (from module config)
   */
  sublistItemClass?: string

  /**
   * Offset from the top of the viewport (in pixels) when determining
   * which heading is currently active. Useful for fixed headers.
   * @default 80 (from module config)
   */
  scrollOffset?: number

  /**
   * Custom path to fetch TOC from. Defaults to current route path.
   * @default undefined (uses current route)
   */
  path?: string

  /**
   * ARIA label for the navigation element.
   * @default 'Table of Contents'
   */
  ariaLabel?: string

  /**
   * The content object to extract TOC from.
   * If provided, avoids double-fetching.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page?: Record<string, any> | null
}

// Define props with defaults from runtime config
const props = withDefaults(defineProps<Props>(), {
  levels: undefined,
  activeClass: undefined,
  itemClass: undefined,
  sublistClass: undefined,
  sublistItemClass: undefined,
  scrollOffset: undefined,
  path: undefined,
  ariaLabel: 'Table of Contents',
  page: undefined,
})

// Get module configuration from runtime config
const config = useRuntimeConfig()
const moduleConfig = config.public.contentToc as {
  levels: number[]
  activeClass: string
  itemClass: string
  sublistClass: string
  sublistItemClass: string
  scrollOffset: number
}

// Computed resolved options (props override module config)
const _resolvedLevels = computed(() => props.levels ?? moduleConfig?.levels ?? [2, 3, 4])
const resolvedActiveClass = computed(() => props.activeClass ?? moduleConfig?.activeClass ?? 'toc-active')
const resolvedItemClass = computed(() => props.itemClass ?? moduleConfig?.itemClass ?? 'toc-item')
const resolvedSublistClass = computed(() => props.sublistClass ?? moduleConfig?.sublistClass ?? 'toc-sublist')
const resolvedSublistItemClass = computed(() => props.sublistItemClass ?? moduleConfig?.sublistItemClass ?? 'toc-sublist-item')
const resolvedScrollOffset = computed(() => props.scrollOffset ?? moduleConfig?.scrollOffset ?? 80)

// Get TOC data from content (use page object if available, otherwise path)
const {
  toc,
  headingIds,
  pending,
  error,
} = useContentToc(props.page || props.path)

// Track active heading
const activeId = useActiveHeading(headingIds, {
  offsetTop: resolvedScrollOffset.value,
})

/**
 * Determines if a TOC item is currently active.
 *
 * @param item - The TOC item to check
 * @returns True if the item or any of its children are active
 */
function isActive(item: TocItem): boolean {
  if (activeId.value === item.id) {
    return true
  }

  // Check if any child is active
  if (item.children) {
    return item.children.some(child => isActive(child))
  }

  return false
}

/**
 * Handles click on a TOC link.
 * Scrolls smoothly to the target heading.
 *
 * @param event - The click event
 * @param id - The heading ID to scroll to
 */
function handleClick(event: Event, id: string) {
  event.preventDefault()

  const element = document.getElementById(id)
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - resolvedScrollOffset.value

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })

    // Update URL hash without jumping
    history.pushState(null, '', `#${id}`)
  }
}

/**
 * Handles keyboard navigation for accessibility.
 *
 * @param event - The keyboard event
 * @param id - The heading ID to navigate to
 */
function handleKeydown(event: KeyboardEvent, id: string) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick(event, id)
  }
}

// On mount, check if there's a hash in the URL and scroll to it
onMounted(() => {
  const hash = window.location.hash.slice(1)
  if (hash) {
    setTimeout(() => {
      const element = document.getElementById(hash)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - resolvedScrollOffset.value
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    }, 100)
  }
})
</script>

<template>
  <nav
    v-if="!pending && toc.length > 0"
    :aria-label="ariaLabel"
    role="navigation"
    class="toc-container"
  >
    <!-- Screen reader announcement -->
    <span class="sr-only">{{ ariaLabel }}</span>

    <!-- Main TOC list -->
    <ul class="toc-list">
      <li
        v-for="item in toc"
        :key="item.id"
        :class="[
          resolvedItemClass,
          { [resolvedActiveClass]: isActive(item) },
        ]"
      >
        <a
          :href="`#${item.id}`"
          class="toc-link"
          :class="{ [resolvedActiveClass]: activeId === item.id }"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click="handleClick($event, item.id)"
          @keydown="handleKeydown($event, item.id)"
        > {{ item.text }} </a>

        <!-- Nested children -->
        <ul
          v-if="item.children && item.children.length > 0"
          :class="resolvedSublistClass"
        >
          <li
            v-for="child in item.children"
            :key="child.id"
            :class="[
              resolvedSublistItemClass,
              { [resolvedActiveClass]: isActive(child) },
            ]"
          >
            <a
              :href="`#${child.id}`"
              class="toc-link"
              :class="{ [resolvedActiveClass]: activeId === child.id }"
              :aria-current="activeId === child.id ? 'location' : undefined"
              @click="handleClick($event, child.id)"
              @keydown="handleKeydown($event, child.id)"
            > {{ child.text }} </a>

            <!-- Third level nesting -->
            <ul
              v-if="child.children && child.children.length > 0"
              :class="resolvedSublistClass"
            >
              <li
                v-for="grandchild in child.children"
                :key="grandchild.id"
                :class="[
                  resolvedSublistItemClass,
                  { [resolvedActiveClass]: activeId === grandchild.id },
                ]"
              >
                <a
                  :href="`#${grandchild.id}`"
                  class="toc-link"
                  :class="{ [resolvedActiveClass]: activeId === grandchild.id }"
                  :aria-current="activeId === grandchild.id ? 'location' : undefined"
                  @click="handleClick($event, grandchild.id)"
                  @keydown="handleKeydown($event, grandchild.id)"
                > {{ grandchild.text }} </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>

  <!-- Loading state -->
  <div
    v-else-if="pending"
    class="toc-loading"
  >
    <span class="sr-only">Loading table of contents...</span>
  </div>

  <!-- Error state -->
  <div
    v-else-if="error"
    class="toc-error"
    role="alert"
  >
    <span class="sr-only">Error loading table of contents</span>
  </div>
</template>

<style scoped>
  /* Component-specific styles that don't override global toc.css */
  .toc-loading,
  .toc-error {
    /* Hidden by default, can be styled by consumer */
    display: block;
  }
</style>
