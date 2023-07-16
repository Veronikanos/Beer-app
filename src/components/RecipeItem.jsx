import { useEffect, useRef } from "react";

export const RecipeItem = ({recipe, handleRightMouseClick, isSelected, handleClick, idx}) => {

    const itemStyle = {
        border: isSelected ? '1px solid blue' : '1px solid black',
        backgroundColor: isSelected ? 'yellow' : '#ffffff',
        height: "calc(100vh / 5)",
        cursor: "pointer"
      };

      const descriptionStyle = {
        width: "50%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }

    //   const lastElement = useRef(null);

    //   useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //       entries.forEach((entry) => {
    //         if (entry.isIntersecting) {

    //         console.log(  "test");
    //         }
    //       });
    //     });
      
    //     if (lastElement.current) {
    //       observer.observe(lastElement.current);
    //     }
      
    //     // Зупинка спостереження при розмонтуванні компонента
    //     return () => {
    //       if (lastElement.current) {
    //         observer.unobserve(lastElement.current);
    //       }
    //     };
    //   }, []);

    //   if (idx === 14){
    //     return (
    //     <li ref={lastElement} onContextMenu={(e) => handleRightMouseClick(e, recipe)} onClick={() => handleClick(recipe)}
    //         style={itemStyle}>
    //       <h3>{recipe.name}</h3>
    //       <p style={descriptionStyle}>{recipe.description}</p>
    //     </li>
    //   )}else {
          return (
    <li onContextMenu={(e) => handleRightMouseClick(e, recipe)} onClick={() => handleClick(recipe)}
        style={itemStyle}>
      <h3>{recipe.name}</h3>
      <p style={descriptionStyle}>{recipe.description}</p>
    </li>
  );
    //   }

};
