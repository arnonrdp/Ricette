<template>
  <section class="flex full-width justify-between q-mt-lg q-px-md">
    <q-btn color="primary" icon="add" label="Add Recipe" no-caps @click="onCreate" />
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
        hide-expand-icon
        :key="recipe.id"
        :label="recipe.name"
        popup
      >
        <template v-slot:header>
          <q-item>
            <q-item-section thumbnail>
              <q-avatar :color="complexityColors.find((color) => color.value === recipe.complexity)?.color">
                <q-icon color="white" name="restaurant" />
                <q-tooltip class="text-capitalize text-caption">{{ recipe.complexity }}</q-tooltip>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <h6>{{ recipe.name }}</h6>
                <p class="q-mb-none text-subtitle1">{{ recipe.description }}</p>
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-card>
          <q-card-section>
            <q-banner dark>
              <div class="row">
                <div class="col-sm-3 col-xs-12 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">SERVINGS</p>
                  <p class="text-italic">{{ recipe.servings }}</p>
                </div>
                <div class="col-sm-3 col-xs-12 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">PREP TIME</p>
                  <p class="text-italic">{{ recipe.prepTime }} min</p>
                </div>
                <div class="col-sm-3 col-xs-12 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">COOK TIME</p>
                  <p class="text-italic">{{ recipe.cookTime }} min</p>
                </div>
                <div v-if="recipe.prepTime && recipe.cookTime" class="col-sm-3 col-xs-12 col-grow text-center">
                  <p class="q-mb-none q-mt-md text-bold">TOTAL TIME</p>
                  <p class="text-italic">{{ recipe.prepTime + recipe.cookTime }} min</p>
                </div>
              </div>
            </q-banner>
            <q-splitter disable :horizontal="$q.screen.xs" :model-value="splitterModel">
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

          <q-card-actions align="right" :vertical="$q.screen.xs">
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import type { Recipe } from '@/model/Recipe'

const emit = defineEmits(['create', 'edit', 'delete-confirmation'])

const recipeStore = useRecipeStore()
const splitterModel = ref<number>(50)

const search = ref<string>('')
const complexityFilter = ref<string>('')
const complexityColors = [
  { value: 'easy', color: 'green' },
  { value: 'medium', color: 'orange' },
  { value: 'hard', color: 'red' }
]

const filteredRecipes = computed(() => {
  return recipeStore.recipes.filter(
    (recipe) =>
      (recipe.name.toLowerCase().includes(search.value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.value.toLowerCase())) &&
      (complexityFilter.value === '' || recipe.complexity === complexityFilter.value)
  )
})

function onCreate() {
  // Emit event to parent component to handle creation
  emit('create')
}

function onEdit(id: Recipe['id']) {
  // Emit event to parent component to handle editing
  emit('edit', id)
}

function onDeleteConfirmation(id: Recipe['id']) {
  // Emit event to parent component to handle delete confirmation
  emit('delete-confirmation', id)
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
