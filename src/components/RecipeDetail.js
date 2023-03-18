import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail({ recipes }) {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setCurrentRecipe(recipes.find(recipe => recipe.id === parseInt(id)));
    }, [id, recipes]);

    if(!currentRecipe) return <h1>Loading...</h1>

    return (
        <div>
            <img src={currentRecipe.image} alt={currentRecipe.titleCapitalized} />
            <h1>{currentRecipe.titleCapitalized}</h1>
            <h3>{"Instructions for " + currentRecipe.servings + " servings:"}</h3>
            <ol>{currentRecipe.instructions.map((step, index) => <li key={index}>{step}</li>)}</ol>
            {currentRecipe.sourceUrl ? <a href={currentRecipe.sourceUrl}>Go to the recipe website!</a> : null}
            <br/>
        </div>
    );
}

export default RecipeDetail;
