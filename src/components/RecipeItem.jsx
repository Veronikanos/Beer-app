export const RecipeItem = ({recipe, handleRightMouseClick, isSelected}) => {

    const itemStyle = {
        border: isSelected ? '1px solid blue' : '1px solid black',
        backgroundColor: isSelected ? 'yellow' : '#ffffff'
      };

  return (
    <li onContextMenu={(e) => handleRightMouseClick(e, recipe)}
        style={itemStyle}>
      {recipe.name}
      <p>{recipe.description}</p>
    </li>
  );
};
