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

    function handleAddStep(e) {
        e.preventDefault();
        setStepCount(++stepCount);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddNewRecipe(newRecipe);
        history.push("/recipes");
    }

    return (
        <div>
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    value={newRecipe.name} 
                    onChange={e => setNewRecipe({...newRecipe, titleCapitalized: e.target.value})}
                />
                <label>Image URL:</label>
                <input 
                    value={newRecipe.imageUrl}
                    onChange={e => setNewRecipe({...newRecipe, image: e.target.value})}
                />
                <label>Serving size:</label>
                <input 
                    value={newRecipe.servingSize}
                    onChange={e => setNewRecipe({...newRecipe, servings: e.target.value})}
                />
                <label>Instructions:</label>
                {[...Array(stepCount)].map((_, index) => (
                    <input
                        key={index}
                        value={newRecipe.instructions[index] || ""}
                        onChange={e => {
                            const newStep = [...newRecipe.instructions];
                            newStep[index] = e.target.value;
                            setNewRecipe({...newRecipe, instructions: newStep});
                        }}
                    />
                ))}
                <button onClick={handleAddStep}>Add step</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddRecipe;
