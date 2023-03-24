import React from "react";

function Home() {
    return (
        <div id="home">
            <h1>Welcome to Recipe Journal!</h1>
            <img width="25%" src="/food_image.jpeg" alt="food_image" />
            <h3>Click on "Recipes" to see a list of recipes.</h3>
            <h3>Click on "Add Recipe" to add a new recipe to the list.</h3>
            <h3>Let's start cooking!</h3>
        </div>
    );
}

export default Home;
