<script setup>
// Removed forced dark mode class for styling verification
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

  body {
    font-family:      system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                      "Helvetica Neue", Arial, sans-serif;
    line-height:      1.5;
    color:            #18181b;
    background-color: #ffffff;
    transition:       background-color 0.3s ease, color 0.3s ease;
  }

  /* Support for dark class on html */
  html.dark body {
    color:            #e4e4e7;
    background-color: #202020;
  }

  .app-root {
    min-height: 100vh;
  }
</style>
