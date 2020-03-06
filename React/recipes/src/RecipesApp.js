import React from 'react'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { Route, Switch } from 'react-router-dom';
import RecipesHome from './RecipesHome'
import RecipesDetail from './RecipesDetail'
import { RecipeProvider } from './contexts/recipes.context'
import { IngredientProvider } from './contexts/ingredients.context'

function RecipesApp() {

    return (
        <Paper style={{
            padding: 0,
            margin: 0,
            height: 'auto',
            backgroundColor: '#fafafa'
        }}
            elevation={0}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Recipes App
                    </Typography>
                </Toolbar>
            </AppBar>
            <RecipeProvider>
                <IngredientProvider>
                    <Switch>
                        <Route exact path='/' render={() => <RecipesHome />} />
                        <Route exact path='/:id' render={routeParams => <RecipesDetail {...routeParams} />} />
                    </Switch>
                </IngredientProvider>
            </RecipeProvider>
        </Paper>
    );
}
export default RecipesApp;
