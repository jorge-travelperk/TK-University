import React from 'react'
import Grid from '@material-ui/core/Grid'
import RecipesForm from './RecipesForm'
import RecipesList from './RecipesList'

export default function RecipesHome() {
    return (
        <Grid container justify='center' style={{ marginTop: '1rem' }}>
            <Grid item xs={11} md={8} lg={4}>
                <RecipesForm />
                <RecipesList />
            </Grid>
        </Grid>
    )
}