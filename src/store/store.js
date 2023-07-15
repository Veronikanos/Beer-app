import { create } from 'zustand'

export const useBeerStore = create((set) => ({
  recipes: [],
  selectedRecipes: [],
  fetchRecipes: async () => {
    try {
    const response = await fetch('https://api.punkapi.com/v2/beers?page=1')
    const jsonData = await response.json();
    set((state) => ({ 
        recipes: jsonData
    }))
    } catch (e) {
        console.error(e.message);
    }

  },
  setSelectedRecipes: (selectedRecipes) =>
  set((state) => ({
    selectedRecipes,
  })),

  deleteSelectedRecipes: () =>
  set((state) => ({
    recipes: state.recipes.filter(item => !state.selectedRecipes.includes(item)),
    selectedRecipes: []
  })),
}))