import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../Security/axiosWithAuth";

function Recipes() {
  const [recipeData, setRecipeData] = useState();

  useEffect(() => {
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
      {recipeData ? (
        recipeData.map(recipe => 
          <div>
            <h2>{recipe.name}</h2>
            <h4>{recipe.course}</h4>
            <h4>{recipe.technique}</h4>
            {/* <h5>{recipe.ingredients.map(ingredient => ingredient)}</h5> */}
          </div>
        )
      ) : (
        <h1> Loading, please wait...</h1>
      )}
    </>
  );
}

export default Recipes;
