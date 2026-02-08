<script setup lang="ts">
/**
 * Index page - nuxt-content-toc documentation demo.
 * Minimalistic dark design with subtle visual polish.
 */

// Force dark mode on this page
onMounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark')
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark')
  }
})

// Also set dark class via useHead for SSR
useHead({
  htmlAttrs: {
    class: 'dark',
  },
  title: 'thaikolja/nuxt-content-toc — The table component for Nuxt and @nuxt/content v2 and v3.',
  meta: [{
    name: 'description',
    content: 'A powerful, accessible Table of Contents module for @nuxt/content v2 and v3',
  }],
})

// Fetch content using v3 API
const { data: page } = await useAsyncData('index', async () => {
  try {
    return await queryCollection('content').path('/').first()
  }
  catch {
    return null
  }
})

// Version constant for display
const resolvedVersion = typeof __NUXT_CONTENT_TOC_VERSION__ !== 'undefined' ? __NUXT_CONTENT_TOC_VERSION__ : '0.0.0'
</script>

<template>
  <div class="page-wrapper">
    <!-- Subtle gradient overlay -->
    <div class="gradient-bg" />

    <!-- Header -->
    <header class="site-header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 6h16M4 12h16M4 18h10"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span class="logo-text">nuxt-content-toc</span>
          <span class="version-badge">{{ resolvedVersion }}</span>
        </div>
        <nav class="header-nav">
          <a
            href="https://github.com/thaikolja/nuxt-content-toc"
            target="_blank"
            class="nav-link"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub </a> <a
            href="https://npmjs.com/thaikolja/nuxt-content-toc"
            target="_blank"
            class="nav-link"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
            </svg>
            npm </a>
        </nav>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Content Area -->
      <main class="content-main">
        <article
          v-if="page"
          class="prose"
        >
          <h1>nuxt-content-toc</h1>

          <div class="meta-bar">
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />
              </svg>
              <span>Kolja Nolte</span>
            </div>
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>MIT License</span>
            </div>
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span>v{{ resolvedVersion }}</span>
            </div>
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                />
              </svg>
              <span>Updated: February 2026</span>
            </div>
          </div>

          <ContentRenderer :value="page" />
        </article>

        <div
          v-else
          class="loading-state"
        >
          <div class="spinner" />
          <p>Loading documentation...</p>
        </div>
      </main>

      <!-- Table of Contents Sidebar -->
      <aside
        v-if="page"
        class="toc-sidebar"
      >
        <div class="toc-sticky">
          <h2 class="toc-title">
            <span class="toc-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            On This Page
          </h2>
          <TableOfContents :page="page" />
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <p>
          Built with
          <span class="heart">♥</span>
          for the Nuxt community
        </p>
        <p class="copyright">
          MIT License © 2024
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  /*
   * Minimalistic Dark Design
   * Clean, modern, with subtle visual interest
   */

  .page-wrapper {
    position:         relative;
    min-height:       100vh;
    background-color: #151515;
    color:            #fafafa;
    overflow-x:       initial;
  }

  /* Subtle gradient background */
  .gradient-bg {
    position:       fixed;
    top:            0;
    left:           0;
    right:          0;
    height:         60vh;
    background:     radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.08), transparent);
    pointer-events: none;
    z-index:        0;
  }

  /* Header */
  .site-header {
    position:        sticky;
    top:             0;
    z-index:         50;
    background:      rgba(21, 21, 21, 0.85);
    backdrop-filter: blur(12px);
    border-bottom:   1px solid rgba(255, 255, 255, 0.06);
  }

  /* Manual H1 & Meta Bar Styles */
  .prose h1 {
    font-size:      3rem;
    font-weight:    700;
    color:          #fafafa;
    letter-spacing: -0.03em;
    line-height:    1.1;
  }

  .meta-bar {
    display:        flex;
    flex-wrap:      wrap;
    gap:            1.5rem;
    margin-bottom:  0rem;
    padding-bottom: 1.5rem;
    border-bottom:  1px solid rgba(255, 255, 255, 0.05);
  }

  .meta-item {
    display:     flex;
    align-items: center;
    gap:         0.5rem;
    font-size:   0.85rem;
    color:       #a1a1aa;
    font-weight: 500;
  }

  .meta-item svg {
    color: #71717a;
  }

  .header-content {
    display:         flex;
    justify-content: space-between;
    align-items:     center;
    max-width:       1440px;
    margin:          0 auto;
    padding:         1rem 2rem;
  }

  .logo {
    display:     flex;
    align-items: center;
    gap:         0.75rem;
  }

  .logo-icon {
    color:      #3b82f6;
    display:    flex;
    transition: transform 0.2s ease;
  }

  .logo:hover .logo-icon {
    transform: rotate(-5deg);
  }

  .logo-text {
    font-size:      1.25rem;
    font-weight:    600;
    color:          #fafafa;
    letter-spacing: -0.02em;
  }

  .version-badge {
    font-size:     0.65rem;
    font-weight:   500;
    color:         #3b82f6;
    background:    rgba(59, 130, 246, 0.1);
    padding:       0.2em 0.5em;
    border-radius: 4px;
    border:        1px solid rgba(59, 130, 246, 0.2);
  }

  .header-nav {
    display: flex;
    gap:     1rem;
  }

  .nav-link {
    display:         flex;
    align-items:     center;
    gap:             0.4rem;
    color:           #71717a;
    text-decoration: none;
    font-size:       0.8rem;
    font-weight:     500;
    padding:         0.5rem 0.75rem;
    border-radius:   6px;
    transition:      all 0.15s ease;
  }

  .nav-link:hover {
    color:      #fafafa;
    background: rgba(255, 255, 255, 0.05);
  }

  /* Main Layout */
  .main-layout {
    position:  relative;
    z-index:   1;
    display:   flex;
    max-width: 1440px;
    margin:    0 auto;
    padding:   4rem 2rem;
    gap:       5rem;
  }

  .content-main {
    flex:      1;
    min-width: 0;
    max-width: 880px;
  }

  /* TOC Sidebar */
  .toc-sidebar {
    width:       260px;
    flex-shrink: 0;
  }

  .toc-sticky {
    position: sticky;
    top:      6rem;
  }

  .toc-title {
    display:        flex;
    align-items:    center;
    gap:            0.5rem;
    font-size:      0.7rem;
    font-weight:    600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color:          #52525b;
    margin-bottom:  1.25rem;
  }

  .toc-icon {
    display: flex;
    color:   #3b82f6;
  }

  /* Loading State */
  .loading-state {
    display:         flex;
    flex-direction:  column;
    align-items:     center;
    justify-content: center;
    padding:         6rem;
    color:           #52525b;
  }

  .spinner {
    width:         2rem;
    height:        2rem;
    border:        2px solid #27272a;
    border-top:    2px solid #3b82f6;
    border-radius: 50%;
    animation:     spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Prose Styles - Minimal Dark Theme */
  .prose {
    line-height: 1.75;
    color:       #d4d4d8;
  }

  .prose :deep(h1) {
    font-size:      3rem;
    font-weight:    700;
    margin-bottom:  .8rem;
    color:          #fafafa;
    letter-spacing: -0.03em;
    line-height:    1.1;
  }

  .prose :deep(h1 + p) {
    font-size:     1.25rem;
    color:         #71717a;
    margin-bottom: 2.5rem;
    line-height:   1.6;
  }

  .prose :deep(hr) {
    border:     none;
    height:     1px;
    background: linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(255, 255, 255, 0.05), transparent);
    margin:     3rem 0;
  }

  .prose :deep(h2) {
    font-size:         1.75rem;
    font-weight:       600;
    margin-top:        3.5rem;
    margin-bottom:     1rem;
    color:             #ffffff;
    scroll-margin-top: 6rem;
    letter-spacing:    -0.02em;
  }

  .prose :deep(h3) {
    font-size:         1.35rem;
    font-weight:       600;
    margin-top:        2rem;
    margin-bottom:     0.75rem;
    color:             #ffffff;
    scroll-margin-top: 6rem;
  }

  .prose :deep(h4) {
    font-size:         0.9rem;
    font-weight:       600;
    margin-top:        1.5rem;
    margin-bottom:     0.5rem;
    color:             #a1a1aa;
    scroll-margin-top: 6rem;
  }

  .prose :deep(p) {
    margin-bottom: 1.25rem;
    color:         #a1a1aa;
  }

  .prose :deep(strong) {
    color:       #e4e4e7;
    font-weight: 600;
  }

  .prose :deep(a) {
    color:           #60a5fa;
    text-decoration: none;
    transition:      color 0.15s ease;
  }

  .prose :deep(a:hover) {
    color: #93c5fd;
  }

  .prose :deep(code) {
    font-size:     0.85em;
    font-family:   "JetBrains Mono", "Fira Code", ui-monospace, monospace;
    background:    rgba(59, 130, 246, 0.08);
    color:         #93c5fd;
    padding:       0.15em 0.35em;
    border-radius: 4px;
  }

  .prose :deep(pre) {
    background:    #0d0d0d;
    border:        1px solid #27272a;
    border-radius: 8px;
    padding:       1.25rem;
    overflow-x:    auto;
    margin:        1.5rem 0;
  }

  .prose :deep(pre code) {
    background: transparent;
    color:      #d4d4d8;
    padding:    0;
    font-size:  0.8rem;
  }

  /* Headings Links */
  .prose :deep(h1 a),
  .prose :deep(h2 a),
  .prose :deep(h3 a),
  .prose :deep(h4 a) {
    color:           inherit;
    text-decoration: none;
    font-weight:     inherit;
  }

  /* Tables */
  .prose :deep(table) {
    width:           100%;
    border-collapse: collapse;
    margin:          1.5rem 0;
    font-size:       0.85rem;
  }

  .prose :deep(th),
  .prose :deep(td) {
    padding:       0.75rem 1rem;
    text-align:    left;
    border-bottom: 1px solid #27272a;
  }

  .prose :deep(th) {
    color:          #71717a;
    font-weight:    500;
    font-size:      0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .prose :deep(td) {
    color: #a1a1aa;
  }

  .prose :deep(td code) {
    font-size: 0.8rem;
  }

  .prose :deep(tr:hover td) {
    background: rgba(255, 255, 255, 0.04);
  }

  .prose :deep(tbody tr:nth-child(odd) td) {
    background: rgba(255, 255, 255, 0.015);
  }

  /* Lists */
  .prose :deep(ul),
  .prose :deep(ol) {
    padding-left:  1.25rem;
    margin-bottom: 1.25rem;
  }

  .prose :deep(li) {
    margin-bottom: 0.4rem;
    color:         #a1a1aa;
  }

  .prose :deep(li strong) {
    color: #e4e4e7;
  }

  .prose :deep(li::marker) {
    color: #3b82f6;
  }

  /* Blockquotes */
  .prose :deep(blockquote) {
    border-left:  2px solid #3b82f6;
    padding-left: 1rem;
    margin:       1.5rem 0;
    color:        #71717a;
    font-style:   italic;
  }

  /* Footer */
  .site-footer {
    position:   relative;
    z-index:    1;
    text-align: center;
    padding:    3rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .footer-content p {
    color:     #52525b;
    font-size: 0.85rem;
    margin:    0;
  }

  .footer-content .heart {
    color: #ef4444;
  }

  .footer-content .copyright {
    margin-top: 0.5rem;
    font-size:  0.75rem;
    color:      #3f3f46;
  }

  /* TOC Overrides for Dark Theme */
  :deep(.toc-container) {
    --toc-text-color:          #71717a;
    --toc-text-color-hover:    #e4e4e7;
    --toc-active-color:        #60a5fa;
    --toc-border-color:        #27272a;
    --toc-active-border-color: #3b82f6;
  }

  :deep(.toc-link) {
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .main-layout {
      gap: 3rem;
    }

    .toc-sidebar {
      width: 220px;
    }
  }

  @media (max-width: 1024px) {
    .toc-sidebar {
      display: none;
    }

    .content-main {
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 1rem;
    }

    .main-layout {
      padding: 2rem 1rem;
    }

    .prose :deep(h1) {
      font-size: 2rem;
    }

    .prose :deep(h2) {
      font-size: 1.25rem;
    }

    .prose :deep(pre) {
      border-radius: 6px;
      padding:       1rem;
      margin-left:   -1rem;
      margin-right:  -1rem;
      border-radius: 0;
    }

    .version-badge {
      display: none;
    }
  }

  /* Manual H1 & Meta Bar Styles */
  .prose h1 {
    font-size:      3rem;
    font-weight:    700;
    margin-bottom:  1rem;
    color:          #fafafa;
    letter-spacing: -0.03em;
    line-height:    1.1;
  }

  .meta-bar {
    display:        flex;
    flex-wrap:      wrap;
    gap:            1.5rem;
    margin-bottom:  3rem;
    padding-bottom: 1.5rem;
    border-bottom:  1px solid rgba(255, 255, 255, 0.05);
  }

  .meta-item {
    display:     flex;
    align-items: center;
    gap:         0.5rem;
    font-size:   0.85rem;
    color:       #a1a1aa;
    font-weight: 500;
  }

  .meta-item svg {
    color: #71717a;
  }
</style>
