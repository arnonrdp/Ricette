<template>
  <q-page class="text-center">
    <q-btn v-if="recipeStore.recipes.length" class="block q-mx-auto q-my-md" color="primary" label="Clear Recipes" @click="clearRecipes" />
    <q-btn v-else class="block q-mx-auto q-my-md" color="primary" label="Restore Standard Recipes" @click="restoreRecipes" />
  </q-page>
</template>

<script setup lang="ts">
import recipes from '@/data/recipes.json'
import type { Recipe } from '@/model/Recipe'
import { useRecipeStore } from '@/stores/recipes'
import { LocalStorage, useQuasar } from 'quasar'

const $q = useQuasar()
const recipeStore = useRecipeStore()

function clearRecipes() {
  LocalStorage.removeItem('recipes')
  $q.notify({ color: 'primary', message: 'Recipes cleared' })
  recipeStore.$reset()
}

function restoreRecipes() {
  LocalStorage.set('recipes', recipes)
  $q.notify({ color: 'primary', message: 'Standard recipes have been added' })
  recipeStore._recipes = LocalStorage.getItem('recipes') as Recipe[]
}
</script>
