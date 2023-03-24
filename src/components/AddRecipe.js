import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddRecipe({ onAddNewRecipe }) {
    const [newRecipe, setNewRecipe] = useState({
        titleCapitalized: "",
        image: "",
        servings: "",
        instructions: [""]
    });
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const formattedInstructions = newRecipe.instructions.map(instruction => {
            return {step: instruction}
        });
        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newRecipe.titleCapitalized,
                image: newRecipe.image,
                servings: newRecipe.servings,
                analyzedInstructions: [{steps: formattedInstructions}]
            })
        })
        .then(r => r.json())
        .then(d => {
            onAddNewRecipe(d)
            history.push("/recipes")
        })
        .catch(e => console.log(e));
    }

    return (
        <div id="add-recipe">
            <h1>Add a New Recipe</h1>
            <form id="add-recipe-form" onSubmit={handleSubmit}>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    id="imageUrl"
                    value={newRecipe.imageUrl}
                    onChange={e => setNewRecipe({...newRecipe, image: e.target.value})}
                />
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    value={newRecipe.name} 
                    onChange={e => setNewRecipe({...newRecipe, titleCapitalized: e.target.value})}
                />
                <label htmlFor="servings">Serving size:</label>
                <input
                    id="servings"
                    value={newRecipe.servingSize}
                    onChange={e => setNewRecipe({...newRecipe, servings: e.target.value})}
                />
                <label htmlFor="instructions">Instructions:</label>
                {newRecipe.instructions.map((_, index) => (
                    <textarea
                        id="instructions"
                        key={index}
                        value={newRecipe.instructions[index]}
                        onChange={e => {
                            const newStep = [...newRecipe.instructions];
                            newStep[index] = e.target.value;
                            setNewRecipe({...newRecipe, instructions: newStep});
                        }}
                    />
                ))}
                <button type="button" onClick={() => setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, ""]})}>Add step</button>
                {newRecipe.instructions.length > 1 ? <button type="button" onClick={() => setNewRecipe({...newRecipe, instructions: newRecipe.instructions.slice(0, -1)})}>Delete last step</button> : null}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddRecipe;
