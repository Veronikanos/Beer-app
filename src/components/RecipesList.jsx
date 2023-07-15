import { useEffect } from "react";
import { useBeerStore } from "../store/store"

export const RecipesList = () =>{
     const beers = useBeerStore((state) => state.recipes);
     const fetchRecipes = useBeerStore((state) => state.fetchRecipes);
    //  const increase = useBeerStore((state) => state.increase)
    // return <><h1>{beers} around here ...</h1>
    // <button onClick={increase}>one up</button></>

    useEffect(()=>{
        fetchRecipes();
    }, [fetchRecipes])
   

    return (<div>Beer list is here: {beers.map(item => {
        return  <li key={item.id}>{item.name}</li>
    })}</div>)
}