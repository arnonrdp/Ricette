<template>
  <q-dialog v-model="isAdding" @hide="recipeStore.resetRecipe">
    <q-card style="width: 30rem">
      <q-form @submit="onSubmit">
        <q-card-section class="q-pb-none">
          <h5>{{ isEditing ? 'Edit Recipe' : 'Add Recipe' }}</h5>
          <q-input class="q-mb-lg q-mt-md" dense label="Name" outlined required v-model="recipe.name" />
          <q-input class="q-mb-lg" dense label="Description" outlined required v-model="recipe.description" />
          <q-select
            class="q-mb-lg"
            dense
            label="Complexity"
            :options="['easy', 'medium', 'hard']"
            outlined
            required
            v-model="recipe.complexity"
          />
          <div class="row q-gutter-x-md">
            <q-input
              class="col-3 col-grow q-mb-lg"
              dense
              label="Servings"
              outlined
              required
              type="number"
              v-model.number="recipe.servings"
            />
            <q-input
              class="col-3 col-grow q-mb-lg"
              dense
              label="Prep Time"
              outlined
              required
              suffix="min"
              type="number"
              v-model.number="recipe.prepTime"
            />
            <q-input
              class="col-3 col-grow q-mb-lg"
              dense
              label="Cook Time"
              outlined
              required
              suffix="min"
              type="number"
              v-model.number="recipe.cookTime"
            />
          </div>
          <q-input class="q-mb-lg" dense label="Image Link" outlined v-model="recipe.imageLink" />
          <q-select
            class="q-mb-xs"
            dense
            hide-dropdown-icon
            hide-hint
            hint="Press Enter to add a new ingredient"
            input-debounce="0"
            label="Ingredients"
            multiple
            new-value-mode="add"
            outlined
            :rules="[(val) => val.length > 0 || 'At least one ingredient is required']"
            use-chips
            use-input
            v-model="recipe.ingredients"
          />
          <q-select
            dense
            hide-dropdown-icon
            hide-hint
            hint="Press Enter to add a new instruction"
            input-debounce="0"
            label="Instructions"
            multiple
            new-value-mode="add"
            outlined
            :rules="[(val) => val.length > 0 || 'At least one instruction is required']"
            use-chips
            use-input
            v-model="recipe.instructions"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn class="full-width q-mb-sm" color="primary" :label="isEditing ? 'Update' : 'Add'" no-caps type="submit" />
          <q-btn class="full-width" color="negative" label="Cancel" no-caps outline v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Recipe } from '@/model/Recipe'
import { useRecipeStore } from '@/stores/recipes'
import { ref } from 'vue'

const recipeStore = useRecipeStore()
const recipe = defineModel<Recipe>({ required: true })
const isAdding = defineModel('isAdding', { default: false, required: true })
const isEditing = ref(false)

function onSubmit() {
  if (isEditing.value) {
    recipeStore.updateRecipe(recipe.value as Recipe)
  } else {
    recipeStore.addRecipe(recipe.value as Recipe)
  }
  isAdding.value = false
  recipeStore.resetRecipe()
}
</script>
