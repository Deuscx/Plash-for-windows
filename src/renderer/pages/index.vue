<script setup lang="ts" generic="T extends any, O extends any">
import { client } from '~/client'

defineOptions({
  name: 'IndexPage',
})

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

function createWindow() {
  client.newWindow('https://bing.com')
}
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu-collective/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
      <button
        class="m-3 text-sm btn"
        @click="createWindow"
      >
        Create New  Window
      </button>
      <button
        class="m-3 text-sm btn"
        @click="() => client.openStoreFile()"
      >
        Open Store Path
      </button>
      <AppUpdate />
    </div>
    <Versions />
  </div>
</template>
