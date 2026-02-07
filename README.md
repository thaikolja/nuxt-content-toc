# nuxt-content-toc

[![npm version](https://img.shields.io/npm/v/nuxt-content-toc?color=brightgreen&label=npm%20package)](https://www.npmjs.com/package/nuxt-content-toc)
[![License](https://img.shields.io/npm/l/nuxt-content-toc)](https://github.com/your-org/nuxt-content-toc/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.x%20%7C%204.x-00C58E?logo=nuxt.js)](https://nuxt.com)
[![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-v2%20%7C%20v3-00C58E)](https://content.nuxt.com)

A highly customizable, accessible, and SSR-friendly Table of Contents (TOC) component for **@nuxt/content**.

> 📖 **Full Documentation**: [https://thaikolja.github.io/nuxt-content-toc/](https://thaikolja.github.io/nuxt-content-toc/)

Works seamlessly with both **Nuxt Content v2** and **v3**.

## Features

- 📚 **[Comprehensive Documentation](https://thaikolja.github.io/nuxt-content-toc/)**: Detailed guides, examples, and API reference.
- 🧩 **Universal Support**: Works with Nuxt Content v2 and v3 automatically.
- 🎯 **Active Highlighting**: Automatically highlights the current section as you scroll.
- 🌳 **Deep Nesting**: Supports arbitrary heading depths (h2, h3, h4, etc.).
- 🎨 **Fully Customizable**: Control classes, offsets, and behavior via config or props.
- ♿ **Accessible**: Built with ARIA standards and keyboard navigation support.
- ⚡ **SSR Friendly**: Renders perfectly on the server for better SEO.

## Quick Setup

1.  Add `nuxt-content-toc` dependency to your project

```bash
# Using yarn
yarn add nuxt-content-toc

# Using npm
npm install nuxt-content-toc

# Using pnpm
pnpm add nuxt-content-toc
```

2.  Add `nuxt-content-toc` to the `modules` section of `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-content-toc',
    '@nuxt/content'
  ]
})
```

That's it! You can now use the `TableOfContents` component in your app.

## Usage

### 1. Basic Usage

Simply drop the component into your page. It automatically fetches the TOC for the current route.

```vue
<template>
  <main>
    <article>
      <ContentDoc /> 
    </article>
    
    <aside>
      <TableOfContents />
    </aside>
  </main>
</template>
```

### 2. With Custom Content Data (Optimized)

If you've already fetched the content data (e.g., using `useAsyncData`), pass it to the component to avoid a duplicate fetch.

```vue
<script setup>
const { data } = await useAsyncData('page', () => queryContent('/').findOne())
</script>

<template>
  <div class="page-layout">
    <ContentRenderer :value="data" />
    
    <!-- Pass the content object directly -->
    <TableOfContents :page="data" />
  </div>
</template>
```

> 💡 **More Examples**: Check out the [Full Documentation](https://thaikolja.github.io/nuxt-content-toc/) for advanced usage scenarios.

## Configuration

You can configure defaults in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-content-toc'],
  
  contentToc: {
    levels: [2, 3, 4],
    activeClass: 'toc-active',
    scrollOffset: 80, // Offset for fixed headers
    itemClass: 'toc-item',
    sublistClass: 'toc-sublist'
  }
})
```

## Component Props (`<TableOfContents />`)

Override global settings per instance using props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `levels` | `number[]` | `[2, 3, 4]` | Headings levels to include. |
| `activeClass` | `string` | `'toc-active'` | Class added to the active link and its parents. |
| `path` | `string` | `current route` | Fetch TOC for a specific path instead of current. |
| `page` | `object` | `null` | Pass content object directly (skips fetch). |
| `scrollOffset` | `number` | `80` | Offset (px) for scroll spy calculation. |
| `ariaLabel` | `string` | `'Table of Contents'` | ARIA label for accessibility. |
| `itemClass` | `string` | `'toc-item'` | Class for each list item (`li`). |
| `sublistClass` | `string` | `'toc-sublist'` | Class for nested lists (`ul`). |

## Development

```bash
# Install dependencies
yarn install

# Run playground
yarn dev

# Run tests
yarn test
```

## License

[MIT License](./LICENSE)
