import type { Recipe } from '@/model/Recipe'
import { defineStore } from 'pinia'
import { LocalStorage, Notify } from 'quasar'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    _recipes: LocalStorage.getItem('recipes') as Recipe[],
    _isLoading: false
  }),

  getters: {
    recipes: (state) => state._recipes,
    isLoading: (state) => state._isLoading
  },

  actions: {
    async addRecipe(recipe: Recipe) {
      this._recipes.push(recipe)
      LocalStorage.set('recipes', this._recipes)
      Notify.create({ message: 'Recipe added', color: 'positive' })
    },

    async deleteRecipe(id: string) {
      this._recipes = this._recipes.filter((recipe) => recipe.id !== id)
      LocalStorage.set('recipes', this._recipes)
      Notify.create({ message: 'Recipe deleted', color: 'negative' })
    },

    async updateRecipe(recipe: Recipe) {
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
