import type { Recipe } from '@/model/Recipe'
import { defineStore } from 'pinia'
import { LocalStorage, Notify } from 'quasar'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    _recipes: LocalStorage.getItem('recipes') as Recipe[],
    _recipe: {
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
    } as Recipe,
    _isLoading: false
  }),

  getters: {
    recipes: (state) => state._recipes,
    isLoading: (state) => state._isLoading
  },

  actions: {
    resetRecipe() {
      this._recipe = {
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
      } as Recipe
    },

    getRecipe(id: Recipe['id']) {
      return this._recipes.find((recipe) => recipe.id === id) as Recipe
    },

    addRecipe(recipe: Recipe) {
      this._recipes.push(recipe)
      LocalStorage.set('recipes', this._recipes)
      Notify.create({ message: 'Recipe added', color: 'positive' })
    },

    deleteRecipe(id: string) {
      this._recipes = this._recipes.filter((recipe) => recipe.id !== id)
      LocalStorage.set('recipes', this._recipes)
      Notify.create({ message: 'Recipe deleted', color: 'negative' })
    },

    updateRecipe(recipe: Recipe) {
      const index = this._recipes.findIndex((r) => r.id === recipe.id)
      if (index === -1) {
        return
      }
      this._recipes[index] = recipe
      LocalStorage.set('recipes', this._recipes)
      Notify.create({ message: 'Recipe updated', color: 'positive' })
    }
  }
})
