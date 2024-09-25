<template>
  <q-layout view="hHh lpR fFf">
    <TheHeader />

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>
