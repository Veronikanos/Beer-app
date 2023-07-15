import {useEffect, useMemo} from 'react';
import {useBeerStore} from '../store/store';
import {RecipeItem} from './RecipeItem';

export const RecipesList = () => {
  const beers = useBeerStore((state) => state.recipes);
  const fetchRecipes = useBeerStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

//   const renderedItemsPerPage = beers.slice(0, 15);
//   console.log(renderedItemsPerPage);

  const visibleItems = useMemo(
    () => beers.slice(0, 15),
    [beers] );

  return (
    <ol>
      <p>Beer list is here:</p>
      {visibleItems.map((item) => (
        <RecipeItem id={item.id} name={item.name} description={item.description}
        />
      ))}
    </ol>
  );
};
