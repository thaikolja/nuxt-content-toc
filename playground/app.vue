<!--
  Playground Root App
  Provides global layout for the demo application
-->

<script setup>
// Force dark mode on HTML element
if (import.meta.client) {
  document.documentElement.classList.add('dark')
}

// Also set via useHead for SSR
useHead({
  htmlAttrs: {
    class: 'dark',
  },
})
</script>

<template>
  <div class="app-root">
    <NuxtPage />
  </div>
</template>

<style>
  /* Global reset and base styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin:     0;
    padding:    0;
  }

  html {
    scroll-behavior: smooth;
  }

  html.dark body {
    font-family:      system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                      "Helvetica Neue", Arial, sans-serif;
    line-height:      1.5;
    color:            #e4e4e7;
    background-color: #202020;
  }

  .app-root {
    min-height: 100vh;
  }
</style>
