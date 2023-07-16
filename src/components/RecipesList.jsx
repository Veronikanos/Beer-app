import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useStore} from '../store/store';
import {RecipeItem} from './RecipeItem';
import {shallow} from 'zustand/shallow'

const RecipesList = () => {

  const { recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe } = useStore(
    ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe }) => ({ recipes, fetchRecipes, selectedRecipes, setSelectedRecipes, deleteSelectedRecipes, setDetailedRecipe }),
    shallow
  )

  const [isInitialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipes();
      setInitialFetchDone(true);
    };
    if (!recipes.length){
       fetchData(); 
    }
  }, []);

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
        setSelectedRecipes(
          selectedRecipes.filter((selectedRecipe) => selectedRecipe !== recipe)
        );
    setDetailedRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  }

// const options = {
//     root: document.querySelector("ol").lastElementChild,
//     rootMargin: '0px',
//     threshold: 1.0
//   }
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isInitialFetchDone) {
        const observer = new IntersectionObserver(
        ([entry]) => { // <- first intersection
            setIsIntersecting(entry.isIntersecting);
            console.log("isIntersecting:", entry.isIntersecting);

        }, 
        
        // { rootMargin: "-300px" }
      );
    //   observer.observe(ref.current);
  
    
      if (ref.current) {
        console.log("ref.current:", ref.current);
        observer.observe(ref.current);
      }
      
      return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
          }
      }  }
  }, [isInitialFetchDone]);

  useEffect(() => {
    if (isIntersecting) {
//       const el = ref.current.querySelector("ol").lastElementChild;
      console.log(ref);
    }
  }, [isIntersecting]);

   
//   const callback = (entries, observer) => {
//     entries.forEach(entry => {
//       // do something
//     })
//   }
   
//   const observer = new IntersectionObserver(callback, options)

// const ref = useRef(null);

// useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting) {
//        console.log("intersecting");
//         }
//     });
//     observer.observe(ref.current);
//   }, []);

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
      <div ref={ref} />
    </div>
  );
};

export default memo(RecipesList);