import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RecipesList from "./RecipesList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  function deleteRecipe(id) {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json())
    .then(() => {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      history.push("/recipes");
    })
    .catch(e => console.log(e));
  }

  return (
    <div id="app">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/recipes">
          <RecipesList
            recipes={recipes}
            onSetRecipes={recipe => setRecipes(recipe)}
          />
        </Route>
        <Route path="/recipes/new">
          <AddRecipe onAddNewRecipe={newRecipe => setRecipes([...recipes, newRecipe])} />
        </Route>
        <Route path="/recipes/:id">
          <RecipeDetail recipes={recipes} onHandleDelete={deleteRecipe} />
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
