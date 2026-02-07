<script setup lang="ts">
const alignment = ref<'left' | 'center' | 'right'>('left')
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div
    class="test-page"
    :class="{ dark: isDark }"
  >
    <div class="controls">
      <button @click="alignment = 'left'">
        Left
      </button>
      <button @click="alignment = 'center'">
        Center
      </button>
      <button @click="alignment = 'right'">
        Right
      </button>
      <button @click="toggleDark">
        Toggle Dark Mode (Current: {{ isDark ? 'Dark': 'Light' }})
      </button>
      <NuxtLink to="/">Back to Main Demo</NuxtLink>
    </div>

    <div class="container">
      <div class="toc-wrapper">
        <TableOfContents :align="alignment" />
      </div>

      <main class="content">
        <ContentDoc path="/styling" />
      </main>
    </div>
  </div>
</template>

<style scoped>
  .test-page {
    min-height:  100vh;
    padding:     2rem;
    background:  white;
    color:       black;
    font-family: sans-serif;
    transition:  background 0.3s, color 0.3s;
  }

  .test-page.dark {
    background: #18181b;
    color:      #f4f4f5;
  }

  .controls {
    margin-bottom:  3rem;
    display:        flex;
    gap:            1rem;
    padding-bottom: 1rem;
    border-bottom:  1px solid #eeeeee;
  }

  .test-page.dark .controls {
    border-bottom-color: #3f3f46;
  }

  .toc-list {
    background: #ff00ff;
  }

  .container {
    max-width: 800px;
    margin:    0 auto;
  }

  .toc-wrapper {
    margin-bottom: 3rem;
  }

  .content {
    line-height: 1.6;
  }

  button {
    padding: 0.5rem 1rem;
    cursor:  pointer;
  }
</style>
