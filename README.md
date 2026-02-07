# nuxt-content-toc

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A highly customizable and accessible Table of Contents component for [@nuxt/content](https://content.nuxtjs.org/) v2 and v3.

## ✨ Features

- 🔄 **Universal Compatibility** - Works with both `@nuxt/content` v2 (file-based) and v3 (SQLite-driven)
- 🎯 **Active TOC Highlighting** - Automatically highlights the currently visible section
- 🔗 **Scroll Synchronization** - Keeps TOC in sync with viewport position
- 🎨 **High Customizability** - Full control over CSS classes, heading levels, and behavior
- ♿ **Accessibility First** - ARIA support, keyboard navigation, screen reader friendly
- 📦 **Zero Config** - Works out of the box with sensible defaults

## 📦 Installation

```bash
# npm
npm install nuxt-content-toc

# yarn
yarn add nuxt-content-toc

# pnpm
pnpm add nuxt-content-toc
```

## 🚀 Quick Start

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-content-toc', '@nuxt/content'],
})
```

Use the component in your pages:

```vue
<template>
  <div class="page-layout">
    <main>
      <ContentDoc />
    </main>
    <aside>
      <TableOfContents />
    </aside>
  </div>
</template>
```

That's it! The component will automatically extract headings from your content and track scroll position.

## ⚙️ Configuration

### Module Options

Configure the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-content-toc'],
  contentToc: {
    // Heading levels to include (default: [2, 3, 4])
    levels: [2, 3, 4],

    // CSS class for active items (default: 'toc-active')
    activeClass: 'toc-active',

    // CSS class for each item (default: 'toc-item')
    itemClass: 'toc-item',

    // CSS class for nested lists (default: 'toc-sublist')
    sublistClass: 'toc-sublist',

    // Offset for scroll position (default: 80)
    scrollOffset: 80,
  },
})
```

### Component Props

Override module options per-component:

```vue
<template>
  <TableOfContents
    :levels="[2, 3]"
    active-class="my-active"
    :scroll-offset="100"
    aria-label="Page Navigation"
  />
</template>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `levels` | `number[]` | `[2, 3, 4]` | Heading levels to include |
| `activeClass` | `string` | `'toc-active'` | Class for active items |
| `itemClass` | `string` | `'toc-item'` | Class for each item |
| `sublistClass` | `string` | `'toc-sublist'` | Class for nested lists |
| `scrollOffset` | `number` | `80` | Top offset in pixels |
| `path` | `string` | Current route | Custom content path |
| `ariaLabel` | `string` | `'Table of Contents'` | ARIA label |

## 🎨 Styling

### CSS Custom Properties

Customize the appearance using CSS variables:

```css
:root {
  --toc-font-size: 0.875rem;
  --toc-text-color: #374151;
  --toc-active-color: #3b82f6;
  --toc-border-color: #e5e7eb;
  --toc-indent: 1rem;
}
```

### Custom Styles Example

```css
/* Active item with accent color */
.toc-active .toc-link {
  color: #4ade80;
  border-left-color: #4ade80;
  font-weight: 500;
}

/* Indented sublists */
.toc-sublist .toc-link {
  padding-left: 1.5rem;
}
```

### Tailwind CSS

If you're using Tailwind, apply classes directly:

```vue
<template>
  <TableOfContents
    active-class="text-blue-500 font-semibold border-l-blue-500"
    item-class="hover:text-gray-900 transition-colors"
  />
</template>
```

## 🔧 Composables

Use the composables directly for custom implementations:

### useContentToc

```ts
const { toc, headingIds, pending, error, refresh } = useContentToc('/docs/intro')
```

### useActiveHeading

```ts
const activeId = useActiveHeading(headingIds, { offsetTop: 100 })
```

### useContentVersion

```ts
const version = useContentVersion() // 'v2' | 'v3'
```

## 📱 Responsive Design

Hide TOC on mobile with CSS:

```css
@media (max-width: 1024px) {
  .toc-sidebar {
    display: none;
  }
}
```

## 🌙 Dark Mode

Dark mode is supported automatically via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --toc-text-color: #d1d5db;
    --toc-active-color: #60a5fa;
  }
}
```

## 📝 License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-content-toc/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-content-toc
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-content-toc.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-content-toc
[license-src]: https://img.shields.io/npm/l/nuxt-content-toc.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-content-toc
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
