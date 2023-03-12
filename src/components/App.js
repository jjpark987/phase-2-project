import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import RecipesList from "./RecipesList";
import AddRecipe from "./AddRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/results")
    .then(r => r.json())
    .then(d => {
      const data = d.map(datum => {
        const { image, title, sourceUrl  } = datum;
        const instructions = datum.analyzedInstructions[0].steps.map(s => s.step);
        const id = d.indexOf(datum);
        return { id, image, title, sourceUrl, instructions };
      })
      setRecipes(data);
    })
  }, []);

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
          <AddRecipe />
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
