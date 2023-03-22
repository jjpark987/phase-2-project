import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddRecipe({ onAddNewRecipe }) {
    const [newRecipe, setNewRecipe] = useState({
        titleCapitalized: "",
        image: "",
        servings: "",
        instructions: []
    });
    let [stepCount, setStepCount] = useState(1);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const formattedInstructions = newRecipe.instructions.map(instruction => {
            return {step: instruction}
        });
        fetch("http://localhost:3000/results", {
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
        <div>
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    value={newRecipe.name} 
                    onChange={e => setNewRecipe({...newRecipe, titleCapitalized: e.target.value})}
                />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    id="imageUrl"
                    value={newRecipe.imageUrl}
                    onChange={e => setNewRecipe({...newRecipe, image: e.target.value})}
                />
                <label htmlFor="servings">Serving size:</label>
                <input
                    id="servings"
                    value={newRecipe.servingSize}
                    onChange={e => setNewRecipe({...newRecipe, servings: e.target.value})}
                />
                <label htmlFor="instructions">Instructions:</label>
                {[...Array(stepCount)].map((_, index) => (
                    <textarea
                        id="instructions"
                        key={index}
                        value={newRecipe.instructions[index] || ""}
                        onChange={e => {
                            const newStep = [...newRecipe.instructions];
                            newStep[index] = e.target.value;
                            setNewRecipe({...newRecipe, instructions: newStep});
                        }}
                    />
                ))}
                <button type="button" onClick={() => setStepCount(++stepCount)}>Add step</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddRecipe;
