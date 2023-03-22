import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RecipesList from "./RecipesList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);

  function addNewRecipe(newRecipe) {
    newRecipe = {...newRecipe, id: recipes.length + 1}
    setRecipes([...recipes, newRecipe]);
  }

  function deleteRecipe(id) {
    fetch(`http://localhost:3000/results/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json())
    .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
    .catch(e => console.log(e));
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/recipes">
          <RecipesList
            recipes={recipes}
            onSetRecipes={recipe => setRecipes(recipe)} 
            onHandleDelete={deleteRecipe}
          />
        </Route>
        <Route path="/recipes/new">
          <AddRecipe onAddNewRecipe={addNewRecipe} />
        </Route>
        <Route path="/recipes/:id">
          <RecipeDetail recipes={recipes} />
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
