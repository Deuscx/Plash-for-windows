<script setup lang="ts">
import { computed } from 'vue'
import { useAppUpdate } from '~/composables/update'

const {
  status,
  updateInfo,
  updateProgressInfo,
  error,
  checkUpdate,
  downloadUpdate,
  applyUpdate,
} = useAppUpdate()

const buttonContent = computed(() => {
  if (status.value === 'update-available') {
    return {
      text: 'Download Updates',
      onClick: downloadUpdate,
    }
  }
  if (status.value === 'download-progress') {
    return {
      text: 'Downloading...',
      onClick: undefined,
    }
  }
  if (status.value === 'update-downloaded') {
    return {
      text: 'Apply Updates',
      onClick: applyUpdate,
    }
  }
  return {
    text: 'Check for Updates',
    onClick: checkUpdate,
  }
})

const updateInformation = computed(() => {
  if (status.value === 'error') {
    return {
      type: 'error',
      content: error.value,
    }
  }
  if (status.value === 'checking-for-update') {
    return {
      type: 'checking',
      content: 'Checking...',
    }
  }
  if (status.value === 'update-not-available') {
    return {
      type: 'not-available',
      content: 'No Updates Available',
    }
  }
  if (updateInfo.value) {
    return {
      type: 'info',
      content: updateInfo.value,
    }
  }
  return null
})
</script>

<template>
  <div>
    <!-- Info Section -->
    <template v-if="updateInformation">
      <template v-if="updateInformation.type === 'error'">
        <p class="text-blue">
          {{ updateInformation.content?.name }}
        </p>
        <p class="text-green">
          {{ updateInformation.content?.message }}
        </p>
        <p class="text-red">
          {{ updateInformation.content?.stack }}
        </p>
      </template>

      <p v-else-if="updateInformation.type === 'checking'">
        {{ updateInformation.content }}
      </p>

      <p v-else-if="updateInformation.type === 'not-available'">
        {{ updateInformation.content }}
      </p>

      <template v-else-if="updateInformation.type === 'info'">
        <p>version: {{ updateInformation.content.version }}</p>
        <p>date: {{ updateInformation.content.releaseDate }}</p>
        <p>name: {{ updateInformation.content.releaseName }}</p>
        <p>notes: {{ updateInformation.content.releaseNotes }}</p>
      </template>
    </template>

    <!-- Progress Bar -->
    <div
      v-if="status === 'download-progress' && updateProgressInfo"
      class="relative mx-auto my-3 h-5 w-[300px] bg-gray-500"
    >
      <div
        class="absolute h-5 bg-blue-500"
        :style="{ width: `${updateProgressInfo.percent * 3}px` }"
      />
    </div>

    <!-- Button -->
    <button
      v-if="buttonContent"
      class="btn"
      :disabled="!buttonContent.onClick"
      @click="buttonContent.onClick"
    >
      {{ buttonContent.text }}
    </button>
  </div>
</template>

<style scoped>

</style>
