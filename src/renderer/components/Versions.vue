<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive((window.electron as any).process.versions)
</script>

<template>
  <ul class="w-full flex items-center justify-center gap-2 text-sm">
    <li>
      Electron v{{ versions.electron }}
    </li>
    <li>
      Chromium v{{ versions.chrome }}
    </li>
    <li>
      Node v{{ versions.node }}
    </li>
  </ul>
</template>
