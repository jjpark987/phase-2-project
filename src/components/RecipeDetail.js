import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail({ recipes, onHandleDelete }) {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [editToggle, setEditToggle] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setCurrentRecipe(recipes.find(recipe => recipe.id === parseInt(id)));
    }, [id, recipes]);

    function handleSubmit() {
        const formattedInstructions = currentRecipe.instructions.map(instruction => {
            return {step: instruction}
        });
        fetch(`http://localhost:3000/recipes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: currentRecipe.titleCapitalized,
                image: currentRecipe.image,
                servings: currentRecipe.servings,
                analyzedInstructions: [{steps: formattedInstructions}]
            })
        })
        .then(r => r.json())
        .then(d => console.log(d))
        .catch(e => console.log(e));
        setEditToggle(() => !editToggle);
    }

    function handleOnChange(e) {
        setCurrentRecipe({...currentRecipe, [e.target.name]: e.target.value})
    }

    if(!currentRecipe) return <h1>Page unavailable</h1>

    if(editToggle) return (
        <div className="edit">
            <h1>Edit Recipe</h1>
            <form className="edit-form" onSubmit={handleSubmit}>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    id="imageUrl"
                    placeholder={currentRecipe.image}
                    name="image" 
                    value={currentRecipe.image} 
                    onChange={(e) => handleOnChange(e)} 
                />
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    placeholder={currentRecipe.titleCapitalized}
                    name="titleCapitalized"
                    value={currentRecipe.titleCapitalized} 
                    onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="servings">Serving size:</label>
                <input
                    id="servings"
                    placeholder={currentRecipe.servings} 
                    name="servings"
                    value={currentRecipe.servings} 
                    onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="instructions">Instructions:</label>
                {currentRecipe.instructions.map((step, index) => 
                    <textarea
                        id="instructions"
                        key={index} 
                        placeholder={step}
                        value={currentRecipe.instructions[index]} 
                        onChange={e => {
                            const currentStep = [...currentRecipe.instructions];
                            currentStep[index] = e.target.value;
                            setCurrentRecipe({...currentRecipe, instructions: currentStep});
                        }}
                    />
                )}
                <button type="button" onClick={() => setCurrentRecipe({...currentRecipe, instructions: [...currentRecipe.instructions, ""]})}>Add step</button>
                {currentRecipe.instructions.length > 1 ? <button type="button" onClick={() => setCurrentRecipe({...currentRecipe, instructions: currentRecipe.instructions.slice(0, -1)})}>Delete last step</button> : null}
                <button type="submit" onClick={handleSubmit}>Submit changes</button>
            </form>
        </div>
    )

    return (
        <div className="detail">
            <img className="detail-image" src={currentRecipe.image} alt={currentRecipe.titleCapitalized} />
            <h1>{currentRecipe.titleCapitalized}</h1>
            <h3>{"Instructions for " + currentRecipe.servings + " serving(s):"}</h3>
            <ol>
                {currentRecipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
            {currentRecipe.sourceUrl ? <a href={currentRecipe.sourceUrl}> Go to the recipe website!</a> : null}
            <br />
            <button type="button" onClick={() => setEditToggle(() => !editToggle)}>Edit recipe</button>
            <br />
            <button type="button" onClick={() => onHandleDelete(currentRecipe.id)}>Delete recipe</button>
        </div>
    );
}

export default RecipeDetail;
