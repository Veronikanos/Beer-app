import {memo, useEffect, useMemo, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useStore} from '../store/store';
import {RecipeItem} from './RecipeItem';
import {shallow} from 'zustand/shallow'

const RecipesList = () => {

  const { recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe, shiftRecipes } = useStore(
    ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe, shiftRecipes }) => ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe, shiftRecipes }),
    shallow
  )

  const [isInitialFetchDone, setInitialFetchDone] = useState(false);

// first render with fetch and put data to zustand store, check if it is not reopened page after visiting Details page.
  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipes();
      setInitialFetchDone(true);
    };
    if (!recipes.length){
       fetchData(); 
    }
  }, []);

  console.log(selectedRecipes);

  // updating state when there is less than 15 recipes left
  useEffect(() => {
    if (isInitialFetchDone && recipes.length < 15) {
      fetchRecipes();
    }
  }, [fetchRecipes, isInitialFetchDone, recipes]);

  
  // handle mouse button clicks
  let visibleItems = useMemo(() => recipes.slice(0, 15), [recipes]);


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
        setSelectedRecipes(
          selectedRecipes.filter((selectedRecipe) => selectedRecipe !== recipe)
        );
    setDetailedRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  }

  const ref = useRef(null);

// implement observer for the end of the list
  useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => { // <- first intersection
            if (entry.isIntersecting){
            shiftRecipes();
            }
        }, 
      );

    
      if (ref.current) {
        console.log("ref.current:", ref.current);
        observer.observe(ref.current);
      
      return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
          }
      }  
    }
  }, [shiftRecipes, isInitialFetchDone]);


  return (
    <div>
        {console.log(recipes)}

       {selectedRecipes.length > 0 && (
        <button onClick={handleDeleteButtonClick}>Delete</button>
      )}
    <h2>Beer list is here:</h2>
    <p>Click <i>left</i> mouse button to see recipe page</p>
    <p>Click <i>right</i> mouse button to select/unselect recipe</p>

      <ol>
        {visibleItems.map((item, idx) => (
          
          <RecipeItem             key={item.id}
            recipe={item}
            handleRightMouseClick={handleRightMouseClick}
            handleClick={handleClick}
            isSelected={selectedRecipes.includes(item)}
            idx={idx}
          />
        ))}
      </ol>
      <div ref={isInitialFetchDone? ref : null} />
    </div>
  );
};

export default memo(RecipesList);