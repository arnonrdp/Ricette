<template>
  <q-header class="text-white" elevated style="background: linear-gradient(90deg, #23152c, #34273c)">
    <q-toolbar class="toolbar">
      <q-toolbar-title>
        <q-img class="cursor-pointer gt-xs" src="@/assets/logo.svg" width="20rem" @click="router.push('/')" />
        <q-img class="cursor-pointer lt-sm" src="/favicon.svg" width="3rem" @click="router.push('/')" />
      </q-toolbar-title>

      <q-tabs align="right">
        <q-route-tab label="Home" no-caps to="/" />
        <q-route-tab label="About" no-caps to="/about" />
        <q-route-tab label="Settings" no-caps to="/settings" />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.toolbar {
  padding: 0 2rem;
}

@media (max-width: 30rem) {
  .toolbar {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem 0;
  }
}
</style>
