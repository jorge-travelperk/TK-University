import React, { createContext } from 'react'
import useRecipeState from '../hooks/useRecipeState'

export const RecipeContext = createContext()

export function RecipeProvider(props) {
    const { recipes, getAllRecipes, addRecipe, deleteRecipe, patchRecipe, getRecipeBySubstring, getRecipeById } = useRecipeState()
    return (
        <RecipeContext.Provider value={{ recipes, getAllRecipes, addRecipe, deleteRecipe, patchRecipe, getRecipeBySubstring, getRecipeById }}>
            {props.children}
        </RecipeContext.Provider>
    )
}