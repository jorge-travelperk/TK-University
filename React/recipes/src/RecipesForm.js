import React, { useContext, useEffect, useState } from 'react'
import useInputState from './hooks/useInputState'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'

import Ingredient from './Ingredient'
import { IngredientContext } from './contexts/ingredients.context'
import { RecipeContext } from './contexts/recipes.context'

export default function RecipesForm() {
    const [name, handleNameChange, resetName] = useInputState("")
    const [description, handleDescChange, resetDesc] = useInputState("")
    const [selectedItems, setItems] = useState([])

    const { ingredients, getAllIngredients, addIngredient } = useContext(IngredientContext)
    const { addRecipe } = useContext(RecipeContext)

    const [ingredientText, handleIngChange, resetIng] = useInputState("")

    useEffect(() => {
        getAllIngredients()
    }, [])

    function addOrDeleteItem(ingredientId) {
        var list = [...selectedItems];
        if (ingredientId) {
            if (selectedItems.includes(ingredientId)) {
                list = list.filter(item => item !== ingredientId)
                setItems(list)
            } else {
                setItems([...selectedItems, ingredientId])
            }
        } else {
            setItems(list)
        }
    }
    return (
        <Paper style={{ textAlign: 'center', margin: '1rem 0', padding: '0 1rem' }}>
            <form>
                <br />
                <h1>New Recipe</h1>
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    margin='normal'
                    label='Name'
                    fullWidth />
                <TextField
                    value={description}
                    onChange={handleDescChange}
                    margin='normal'
                    label='Description'
                    fullWidth />
                <br />
                <br />
                <List
                    label='Ingredients List'
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <h3>Available ingredients list</h3>
                        </ListSubheader>
                    } component='div' disablePadding>
                    {
                        ingredients?.map((ingredient, id) => (
                            <Ingredient ingredient={ingredient} editable={true} fromForm={true} addOrDeleteItem={addOrDeleteItem} key={id} />
                        ))
                    }
                </List>
                <TextField
                    value={ingredientText}
                    onChange={handleIngChange}
                    margin='normal'
                    label='New Ingredient'
                    fullWidth />
                <Button
                    style={{ margin: '15px' }}
                    variant="outlined"
                    onClick={() => {
                        addIngredient(ingredientText)
                        resetIng()
                    }}>
                    Add ingredient
                </Button>
            </form>
            <Button
                style={{ margin: '15px' }}
                variant="outlined"
                color="primary"
                onClick={() => {
                    addRecipe(name, description, selectedItems)
                    getAllIngredients()
                    resetName()
                    resetDesc()
                }}>
                Create recipe
            </Button>
        </Paper>
    )
}