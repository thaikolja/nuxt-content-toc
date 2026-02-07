<script setup lang="ts">
import { useAsyncData } from '#app'
import { queryCollection } from '#imports'

const { data } = await useAsyncData('home', () => queryCollection('content').path('/').first())
</script>

<template>
  <div>
    <main>
      <ContentRenderer :value="data" />
    </main>
    <aside>
      <TableOfContents :page="data" />
    </aside>
  </div>
</template>
