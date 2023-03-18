import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RecipesList from "./RecipesList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/results")
    .then(r => r.json())
    .then(d => {
      const data = d.map(datum => {
        const { image, title, sourceUrl, servings  } = datum;
        const id = d.indexOf(datum) + 1;
        const titleCapitalized = title.split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        const instructions = datum.analyzedInstructions[0].steps.map(s => s.step);
        return { id, image, titleCapitalized, sourceUrl, servings, instructions };
      })
      setRecipes(data);
    })
    .catch(e => console.log(e));
  }, []);

  function addNewRecipe(newRecipe) {
    newRecipe = {...newRecipe, id: recipes.length + 1}
    setRecipes([...recipes, newRecipe]);
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/recipes">
          <RecipesList recipes={recipes} />
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
