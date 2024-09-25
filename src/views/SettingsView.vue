<template>
  <q-page class="text-center">
    <q-btn class="q-my-md" color="primary" label="Clear Recipes" @click="clearRecipes" />
  </q-page>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const recipeStore = useRecipeStore()

function clearRecipes() {
  localStorage.removeItem('recipes')
  $q.notify({ color: 'primary', message: 'Recipes cleared' })
  recipeStore.$reset()
}
</script>
