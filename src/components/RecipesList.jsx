import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useStore} from '../store/store';
import {RecipeItem} from './RecipeItem';
import {shallow} from 'zustand/shallow'

const RecipesList = () => {

  const { recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes } = useStore(
    ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes }) => ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes }),
    shallow
  )

  const [isInitialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipes();
      setInitialFetchDone(true);
    };

    fetchData();
  }, []);

//   useEffect(() => {
//     recipesRef.current = recipes;
//   }, [recipes]);

  useEffect(() => {
    if (isInitialFetchDone && recipes.length < 15) {
      fetchRecipes();
    }
  }, [fetchRecipes, isInitialFetchDone, recipes]);

  
  // handle mouse button clicks
  const visibleItems = useMemo(() => recipes.slice(0, 15), [recipes]);

  const handleRightMouseClick = (e, recipe) => {
    e.preventDefault();
    // console.log(visibleItems);

    if (!selectedRecipes.includes(recipe)) {
      setSelectedRecipes([...selectedRecipes, recipe]);
    } else {
      setSelectedRecipes(
        selectedRecipes.filter((item) => item !== recipe)
      );
    }
  };

  const handleDeleteButtonClick = () => {
    deleteSelectedRecipes();
  };

  let navigate = useNavigate();
  const handleClick = (recipe) => {
    if (!selectedRecipes.includes(recipe)) {
        setSelectedRecipes([...selectedRecipes, recipe]);
      } else {
        setSelectedRecipes(
          selectedRecipes.filter((selectedRecipe) => selectedRecipe !== recipe)
        );
      }
    navigate(`/${recipe.id}`);
  }

  return (
    <div>
        {console.log(recipes)}
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
            handleClick={handleClick}
            isSelected={selectedRecipes.includes(item)}
          />
        ))}
      </ol>
    </div>
  );
};

export default memo(RecipesList);