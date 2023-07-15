export const RecipeItem = ({id, name, description}) => {
    return (<li key={id}>{name}
        <p>{description}</p>
    </li>)
}