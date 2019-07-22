import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../Security/axiosWithAuth";

function Recipes() {
  const [recipeData, setRecipeData] = useState();

  useEffect(() => {
    // Wraps axios request with token authorization
    //  [] empty, runs once as a componentDidMount substitute
    axiosWithAuth()
      .get("http://localhost:5000/api/restricted/data")
      .then(res => {
        console.log("res data");
        console.log(res.data);
        setRecipeData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      Hello from recipes. You made it!
      {console.log("recipeData hook below")}
      {console.log(recipeData)}
      {/* Awesome, fantastic, magical ternary.  "Loading, please wait"
    will display for as long as needed until the axios get request above resolves.
    once it does, it setsState, which automatically forces a re-render, however
    long it takes, and then the mapping can go to work.  No guessing timeouts,
    no guessing how long the server takes.
    Can sub in a Loading animation for "Loading", 
    via separate component if you wanna get fancy
    */}
      {recipeData ? (
        recipeData.map(recipe => (
          <div>
            <h2>Recipe Name:  {recipe.name}</h2>
            <h4>Course: {recipe.course}</h4>
            <h4>Technique: {recipe.technique}</h4>
             <h4>Ingredients:</h4> <h5>{recipe.ingredients.map(ingredient => <p>{ingredient}</p>)}</h5>
          </div>
        ))
      ) : (
        <h1> Loading, please wait...</h1>
      )}
    </>
  );
}

export default Recipes;
