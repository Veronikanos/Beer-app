import {useEffect} from 'react';
import {useBeerStore} from '../store/store';
import {RecipeItem} from './RecipeItem';

export const RecipesList = () => {
  const beers = useBeerStore((state) => state.recipes);
  const fetchRecipes = useBeerStore((state) => state.fetchRecipes);
  //  const increase = useBeerStore((state) => state.increase)
  // return <><h1>{beers} around here ...</h1>
  // <button onClick={increase}>one up</button></>

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);



  return (
    <ol>
      <p>Beer list is here:</p>
      {beers.map((item) => (
        <RecipeItem id={item.id} name={item.name} description={item.description}
        />
      ))}
    </ol>
  );
};
