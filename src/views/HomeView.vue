<template>
  <q-page class="q-py-md">
    <section class="flex full-width justify-between q-mt-lg q-px-md">
      <q-btn color="primary" icon="add" label="Add Recide" no-caps @click="onCreate" />
      <div class="q-gutter-x-md row">
        <q-input dense placeholder="Search" outlined v-model="search" />
        <q-select
          dense
          label="Filter by Complexity"
          outlined
          :options="['easy', 'medium', 'hard']"
          style="width: 10rem"
          v-model="complexityFilter"
        />
      </div>
    </section>

    <q-list class="q-mt-md">
      <TransitionGroup name="list">
        <q-expansion-item
          v-for="recipe in filteredRecipes"
          :caption="`Complexity: ${recipe.complexity}`"
          :default-opened="recipe.id === '1'"
          group="recipe"
          :key="recipe.id"
          :label="recipe.name"
          popup
        >
          <q-separator />
          <q-card>
            <q-card-section>
              <h6>{{ recipe.name }}</h6>
              <p class="text-subtitle1">{{ recipe.description }}</p>

              <q-banner dark>
                <div class="row">
                  <div class="col-3 col-grow text-center">
                    <p class="q-mb-none q-mt-md text-bold">SERVINGS</p>
                    <p class="text-italic">{{ recipe.servings }}</p>
                  </div>
                  <div class="col-3 col-grow text-center">
                    <p class="q-mb-none q-mt-md text-bold">PREP TIME</p>
                    <p class="text-italic">{{ recipe.prepTime }} min</p>
                  </div>
                  <div class="col-3 col-grow text-center">
                    <p class="q-mb-none q-mt-md text-bold">COOK TIME</p>
                    <p class="text-italic">{{ recipe.cookTime }} min</p>
                  </div>
                  <div v-if="recipe.prepTime && recipe.cookTime" class="col-3 col-grow text-center">
                    <p class="q-mb-none q-mt-md text-bold">TOTAL TIME</p>
                    <p class="text-italic">{{ recipe.prepTime + recipe.cookTime }} min</p>
                  </div>
                </div>
              </q-banner>

              <q-splitter disable :model-value="splitterModel">
                <template v-slot:before>
                  <div class="q-pa-md">
                    <h5 class="q-mb-md">Ingredients</h5>
                    <q-list>
                      <q-item v-for="(ingredient, index) in recipe.ingredients" clickable :key="index" v-ripple>
                        <q-item-section class="text-body1 text-capitalize">&bullet; {{ ingredient }}</q-item-section>
                      </q-item>
                    </q-list>
                    <q-img class="full-width q-mt-md" :src="recipe.imageLink" />
                  </div>
                </template>

                <template v-slot:after>
                  <div class="q-pa-md">
                    <h5 class="q-mb-md">Instructions</h5>
                    <q-list>
                      <q-item v-for="(instruction, index) in recipe.instructions" clickable :key="index" v-ripple>
                        <q-item-section class="text-body1 text-capitalize">{{ index + 1 }}. {{ instruction }}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </template>
              </q-splitter>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn color="primary" icon="edit" label="Edit" no-caps style="width: 10rem" @click="onEdit(recipe.id)" />
              <q-btn
                color="negative"
                icon="delete"
                label="Delete"
                no-caps
                outline
                style="width: 10rem"
                @click="onDeleteConfirmation(recipe.id)"
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </TransitionGroup>
    </q-list>

    <RecipeForm v-if="recipe" v-model="recipe" v-model:isAdding="isAdding" />

    <q-dialog v-model="isDeleting" @hide="resetRecipe">
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
import type { Recipe } from '@/model/Recipe'
import { useRecipeStore } from '@/stores/recipes'
import { computed, ref } from 'vue'

const recipeStore = useRecipeStore()
const splitterModel = ref<number>(50)

const isAdding = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const recipe = ref<Recipe>()
const search = ref<string>('')
const complexityFilter = ref<string>('')

const filteredRecipes = computed(() => {
  return recipeStore.recipes.filter(
    (recipe) =>
      (recipe.name.toLowerCase().includes(search.value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.value.toLowerCase())) &&
      (complexityFilter.value === '' || recipe.complexity === complexityFilter.value)
  )
})

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
