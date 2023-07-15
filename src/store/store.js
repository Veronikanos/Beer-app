import { create } from 'zustand'

export const useBeerStore = create((set) => ({
  recipes: [],
  fetchRecipes: async () => {
    const response = await fetch('https://api.punkapi.com/v2/beers?page=1')
    set({ recipes: await response.json() })
  },
}))