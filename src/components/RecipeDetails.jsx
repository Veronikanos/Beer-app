import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";


export const RecipeDetails = () => {
    const navigate = useNavigate();
    const {name, description, food_pairing, boil_volume} = useStore.getState().detailedRecipe;
  
    const handleGoBack = () => {
        const deleteDetailedRecipe = useStore.getState().deleteDetailedRecipe;
        deleteDetailedRecipe();

      navigate(-1); 
    };
  
    return (
      <div>
        <button onClick={handleGoBack}>
          Go Back
        </button>
        <h2>Recipe Details</h2>
        <p><b>Recipe name: </b>{name}</p>
        <p><b>Description: </b>{description}</p>
        <p><b>Food pairing: </b>{food_pairing.join(', ')}</p>
        <p><b>Boil volume: </b>{boil_volume.value + ' ' + boil_volume.unit}</p>
      </div>
    );
}