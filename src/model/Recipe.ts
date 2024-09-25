export interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  imageLink?: string
  complexity: 'easy' | 'medium' | 'hard'
  prepTime?: number // in minutes
  cookTime?: number // in minutes
  servings?: number
}
