import {useEffect, useMemo} from 'react';
import {useBeerStore} from '../store/store';
import {RecipeItem} from './RecipeItem';

export const RecipesList = () => {
  const recipes = useBeerStore((state) => state.recipes);
  const fetchRecipes = useBeerStore((state) => state.fetchRecipes);
  const selectedRecipes = useBeerStore(
    (state) => state.selectedRecipes
  );
  const setSelectedRecipes = useBeerStore(
    (state) => state.setSelectedRecipes
  );
  const deleteSelectedRecipes = useBeerStore(
    (state) => state.deleteSelectedRecipes
  );

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {}, [recipes.length]);

  //   const renderedItemsPerPage = beers.slice(0, 15);
  //   console.log(renderedItemsPerPage);

  // handle mouse button clicks
  const visibleItems = useMemo(() => recipes.slice(0, 15), [recipes]);

  const handleRightMouseClick = (e, recipe) => {
    e.preventDefault();
    console.log(visibleItems);
    // const foundRecipeById = visibleItems.find(item => item.id === id);
    if (!selectedRecipes.includes(recipe)) {
      setSelectedRecipes([...selectedRecipes, recipe]);
    } else {
      setSelectedRecipes(
        selectedRecipes.filter((item) => item !== recipe)
      );
    }
    // console.log(selectedRecipes);
    // visibleItems.filter(item => item.id === id)
    // if (visibleItems.filter(item => item.id === id)){
    //     console.log(id);
    // }
  };

  const handleDeleteButtonClick = () => {
    deleteSelectedRecipes();
  };

  return (
    <div>
      {selectedRecipes.length > 0 && (
        <button onClick={handleDeleteButtonClick}>Delete</button>
      )}
      <ol>
        <p>Beer list is here:</p>
        {visibleItems.map((item) => (
          <RecipeItem
            key={item.id}
            recipe={item}
            handleRightMouseClick={handleRightMouseClick}
            isSelected={selectedRecipes.includes(item)}
          />
        ))}
      </ol>
    </div>
  );
};
