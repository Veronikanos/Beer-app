import { create } from 'zustand';

export const useStore = create((set, get) => ({
  recipes: [],
  selectedRecipes: [],
  page: 1,

  fetchRecipes: async () => {
    const page = get().page;
    const recipes = get().recipes;
    console.log(page);
    // if (recipes.length > 0) {
    //     return;
    //   }
    try {
      const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
      const jsonData = await response.json();
      console.log("fetch");
      set((state) => ({
        recipes: [...state.recipes, ...jsonData],
        page: state.page + 1, 
      }));
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

// console.log(useStore);