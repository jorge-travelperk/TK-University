import { useState } from "react";
import axios from 'axios'

export default initialRecipes => {
  const [recipes, setRecipes] = useState([])
  const url = 'http://localhost:8000/api/recipes/'

  function detailUrl(id) {
    return `${url}${id}/`
  }

  function substringUrl(substring) {
    return `${url}?name=${substring}`
  }

  async function getAll() {
    const res = await axios.get(url)
    setRecipes(res.data)
  }

  return {
    recipes,
    getAllRecipes: () => {
      getAll()
    },
    addRecipe: async (name, description, ingredients) => {
      await axios.post(url, {
        'name': name,
        'description': description,
        'ingredients': ingredients
      })
      getAll()
    },
    deleteRecipe: async recipeId => {
      await axios.delete(detailUrl(recipeId))
      getAll()
    },
    patchRecipe: async (recipeId, newRecipe) => {
      await axios.patch(detailUrl(recipeId), newRecipe)
      getAll()
    },
    getRecipeBySubstring: async substring => {
      const res = await axios.get(substringUrl(substring))
      if (res.data && res.data.length > 0) {
        setRecipes(res.data)
      } else {
        getAll()
      }
    },
    getRecipeById: async id => {
      const res = await axios.get(detailUrl(id))
      let a = []
      a.push(res.data)
      setRecipes(a)
    }
  };
};
