import React, { useContext, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'

import { IngredientContext } from './contexts/ingredients.context'
import { RecipeContext } from './contexts/recipes.context'
import { useParams } from 'react-router-dom'

export default function RecipesDetail() {
    const { ingredients, getAllIngredients } = useContext(IngredientContext)
    const { recipes, getRecipeById } = useContext(RecipeContext)
    let params = useParams()

    useEffect(() => {
        getRecipeById(params.id)
    }, [])

    return (
        <Paper style={{ textAlign: 'left', margin: '1rem 0', padding: '20px' }}>
            <h1>Recipe Details:</h1>
            <h2>Recipe name: {recipes[0]?.name}</h2>
            <h3>Recipe description: {recipes[0]?.description}</h3>
            <h3>List of ingredients:</h3>
            {recipes[0]?.ingredients?.map((ing, id) => {
                return <h4 key={id}>{ing.name}</h4>
            })}
        </Paper>
    )
}