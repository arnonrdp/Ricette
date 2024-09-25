<template>
  <q-page class="q-py-md" style="">
    <section class="flex full-width justify-between">
      <q-btn color="primary" label="Add Recide" no-caps />
      <q-input dense placeholder="Search" outlined v-model="search" />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref<string>('')
</script>
