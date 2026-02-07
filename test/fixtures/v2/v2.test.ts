import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('v2 fixture', async () => {
  await setup({
    rootDir: __dirname,
  })

  it('renders the TableOfContents component', async () => {
    // Determine the path to index page.
    // Content v2 usually renders at root path '/' if content/index.md exists.
    const html = await $fetch('/')

    // Check if the component rendered
    expect(html).toContain('toc-item')

    // Check if specific headings from index.md are present in TOC
    expect(html).toContain('Installation')
    expect(html).toContain('Basic Usage')
    expect(html).toContain('Configuration')
  })
})
