/**
 * @fileoverview Integration Tests for nuxt-content-toc
 * @description Tests the TableOfContents component rendering, active class
 * application, and TOC extraction in an SSR environment.
 */

import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('nuxt-content-toc', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the TableOfContents component', async () => {
    const html = await $fetch('/')
    expect(html).toContain('toc-container')
  })

  it('extracts headings from content', async () => {
    const html = await $fetch('/')
    // Should contain links to the headings
    expect(html).toContain('First Section')
    expect(html).toContain('Second Section')
    expect(html).toContain('Third Section')
  })

  it('applies custom activeClass from config', async () => {
    const html = await $fetch('/')
    // The test fixture uses 'test-active' as activeClass
    // At least the class should be referenced in the component
    expect(html).toContain('test-active')
  })

  it('renders nested headings', async () => {
    const html = await $fetch('/')
    expect(html).toContain('First Subsection')
    expect(html).toContain('Second Subsection')
  })

  it('includes ARIA navigation role', async () => {
    const html = await $fetch('/')
    expect(html).toContain('role="navigation"')
    expect(html).toContain('aria-label')
  })

  it('renders anchor links with heading IDs', async () => {
    const html = await $fetch('/')
    // Links should have href="#heading-id" format
    expect(html).toMatch(/href="#[a-z-]+"/i)
  })
})
