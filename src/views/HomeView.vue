<template>
  <q-page class="q-py-md" style="">
    <section class="flex full-width justify-between">
      <q-btn color="primary" label="Add Recide" no-caps />
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
                <div class="col-3 text-center">
                  <p class="q-mb-none q-mt-md text-bold">SERVINGS:</p>
                  <p class="text-italic">{{ recipe.servings }}</p>
                </div>
                <div class="col-3 text-center">
                  <p class="q-mb-none q-mt-md text-bold">PREP TIME:</p>
                  <p class="text-italic">{{ recipe.prepTime }} min</p>
                </div>
                <div class="col-3 text-center">
                  <p class="q-mb-none q-mt-md text-bold">COOK TIME:</p>
                  <p class="text-italic">{{ recipe.cookTime }} min</p>
                </div>
                <div v-if="recipe.prepTime && recipe.cookTime" class="col-3 text-center">
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
                      <q-item-section class="text-capitalize">
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
                      <q-item-section class="text-capitalize">
                        &bullet; {{ instruction }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>
            </q-splitter>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" label="Edit" no-caps />
            <q-btn color="negative" label="Delete" no-caps />
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes'
import { ref } from 'vue'

const recipeStore = useRecipeStore()
const splitterModel = ref<number>(50)

const search = ref<string>('')
</script>
