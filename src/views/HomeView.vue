<template>
  <q-page class="q-py-md" style="">
    <section class="flex full-width justify-between">
      <q-btn color="primary" label="Add Recide" no-caps @click="isAdding = true" />
      <q-input dense placeholder="Search" outlined v-model="search" />
    </section>

    <q-list class="q-mt-md">
      <q-expansion-item
        v-for="recipe in recipeStore.recipes"
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
                  <p class="q-mb-none q-mt-md text-bold">SERVINGS:</p>
                  <p class="text-italic">{{ recipe.servings }}</p>
                </div>
                <div class="col-3 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">PREP TIME:</p>
                  <p class="text-italic">{{ recipe.prepTime }} min</p>
                </div>
                <div class="col-3 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">COOK TIME:</p>
                  <p class="text-italic">{{ recipe.cookTime }} min</p>
                </div>
                <div v-if="recipe.prepTime && recipe.cookTime" class="col-3 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">TOTAL TIME:</p>
                  <p class="text-italic">{{ recipe.prepTime + recipe.cookTime }} min</p>
                </div>
              </div>
            </q-banner>

            <q-splitter disable :model-value="splitterModel">
              <template v-slot:before>
                <div class="q-pa-md">
                  <h5 class="q-mb-md">Ingredients</h5>
                  <q-list>
                    <q-item
                      v-for="(ingredient, index) in recipe.ingredients"
                      clickable
                      :key="index"
                      v-ripple
                    >
                      <q-item-section class="text-body1 text-capitalize">
                        &bullet; {{ ingredient }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-img class="full-width q-mt-md" :src="recipe.imageLink" />
                </div>
              </template>

              <template v-slot:after>
                <div class="q-pa-md">
                  <h5 class="q-mb-md">Instructions</h5>
                  <q-list>
                    <q-item
                      v-for="(instruction, index) in recipe.instructions"
                      clickable
                      :key="index"
                      v-ripple
                    >
                      <q-item-section class="text-body1 text-capitalize">
                        &bullet; {{ instruction }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>
            </q-splitter>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" label="Edit" no-caps @click="onEdit(recipe)" />
            <q-btn color="negative" label="Delete" no-caps @click="onDelete(recipe.id)" />
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </q-list>

    <q-dialog v-model="isAdding" @hide="resetRecipe">
      <q-card style="width: 30rem">
        <q-form @submit="onSubmit">
          <q-card-section class="q-pb-none">
            <h5>{{ isEditing ? 'Edit Recipe' : 'Add Recipe' }}</h5>
            <q-input
              class="q-mb-lg q-mt-md"
              dense
              label="Name"
              outlined
              required
              v-model="recipe.name"
            />
            <q-input
              class="q-mb-lg"
              dense
              label="Description"
              outlined
              required
              v-model="recipe.description"
            />
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
            <q-btn
              class="full-width q-mb-sm"
              color="primary"
              :label="isEditing ? 'Update' : 'Add'"
              no-caps
              type="submit"
            />
            <q-btn
              class="full-width"
              color="negative"
              label="Cancel"
              no-caps
              outline
              @click="isAdding = false"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import type { Recipe } from '@/model/Recipe'
import { useRecipeStore } from '@/stores/recipes'
import { ref } from 'vue'

const recipeStore = useRecipeStore()
const splitterModel = ref<number>(50)

const isAdding = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const recipe = ref<Recipe>({
  id: '',
  name: '',
  description: '',
  complexity: 'easy',
  servings: 0,
  prepTime: 0,
  cookTime: 0,
  imageLink: '',
  ingredients: [],
  instructions: []
})
const search = ref<string>('')

function resetRecipe() {
  isEditing.value = false
  recipe.value = {
    id: '',
    name: '',
    description: '',
    complexity: 'easy',
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    imageLink: '',
    ingredients: [],
    instructions: []
  }
}

function onSubmit() {
  if (isEditing.value) {
    recipeStore.updateRecipe(recipe.value)
  } else {
    recipeStore.addRecipe(recipe.value)
  }
  isAdding.value = false
  resetRecipe()
}

function onEdit(item: Recipe) {
  isEditing.value = true
  isAdding.value = true
  recipe.value = { ...item }
}

function onDelete(id: string) {
  recipeStore.deleteRecipe(id)
}
</script>
