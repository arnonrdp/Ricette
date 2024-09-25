<template>
  <q-layout view="hHh lpR fFf">
    <TheHeader />

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import recipes from '@/data/recipes.json'
import { LocalStorage, useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

const $q = useQuasar()

onMounted(() => {
  if (!LocalStorage.hasItem('recipes')) {
    $q.notify({ color: 'primary', message: 'Standard recipes have been added' })
    LocalStorage.set('recipes', recipes)
  }
})
</script>
