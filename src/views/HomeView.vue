<template>
  <q-page class="q-py-md">
    <RecipeList @create="onCreate" @edit="onEdit" @deleteConfirmation="onDeleteConfirmation" />

    <RecipeForm v-if="recipe" v-model="recipe" v-model:isAdding="isAdding" v-model:is-editing="isEditing" />

    <q-dialog v-if="recipe" v-model="isDeleting" @hide="resetRecipe">
      <q-card style="width: 30rem">
        <q-card-section class="q-pb-none">
          <h5>Delete Recipe</h5>
          <p class="text-body1">Are you sure you want to delete this delicious {{ recipe.name }}?</p>
        </q-card-section>

        <q-card-actions>
          <q-btn class="full-width q-mb-sm" color="primary" label="Delete" no-caps @click="onDelete(recipe.id)" />
          <q-btn class="full-width" color="negative" label="Cancel" no-caps outline @click="isDeleting = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import RecipeForm from '@/components/RecipeForm.vue'
import RecipeList from '@/components/RecipeList.vue'
import type { Recipe } from '@/model/Recipe'
import { useRecipeStore } from '@/stores/recipes'
import { ref } from 'vue'

const recipeStore = useRecipeStore()

const isAdding = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const recipe = ref<Recipe>()

function resetRecipe() {
  isAdding.value = false
  isDeleting.value = false
  isEditing.value = false
  recipeStore.resetRecipe()
}

function onCreate() {
  isAdding.value = true
  isEditing.value = false
  recipeStore.resetRecipe()
  recipe.value = recipeStore._recipe
}

function onEdit(id: Recipe['id']) {
  isEditing.value = true
  isAdding.value = true
  recipe.value = { ...recipeStore.getRecipe(id) }
}

function onDeleteConfirmation(item: Recipe['id']) {
  isDeleting.value = true
  recipe.value = { ...recipeStore.getRecipe(item) }
}

function onDelete(id: string) {
  recipeStore.deleteRecipe(id)
  isDeleting.value = false
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
