import React, { useContext, useState } from "react";
import useToggleState from './hooks/useToggleState'

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from '@material-ui/core/List'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { IngredientContext } from "./contexts/ingredients.context";
import VisibilityIcon from '@material-ui/icons/Visibility';

import Ingredient from './Ingredient'
import { RecipeContext } from "./contexts/recipes.context";
import { Link } from 'react-router-dom'


export default function Recipe({ recipe }) {
    const [visible, toggleVisible] = useToggleState()
    const [editable, toggleEditable] = useToggleState()
    const { ingredients, getAllIngredients } = useContext(IngredientContext)
    const { deleteRecipe, patchRecipe } = useContext(RecipeContext)
    const [items, setItems] = useState([...recipe.ingredients])

    var ings = ingredients?.filter(ing => recipe.ingredients.includes(ing.id) || editable)

    function addOrDeleteItem(ingredientId) {
        var list = [...items];
        if (ingredientId) {
            if (items.includes(ingredientId)) {
                list = list.filter(item => item !== ingredientId)
                setItems(list)
            } else {
                setItems([...items, ingredientId])
            }
        } else {
            setItems(list)
        }
    }

    return (
        <>
            <ListItem button onClick={toggleVisible} style={{ height: '64px' }}>
                <ListItemText primary={recipe?.name} secondary={recipe?.description} />
                <ListItemSecondaryAction>
                    <Link to={{ pathname: `/${recipe.id}` }}>
                        <IconButton aria-label='Detail'><VisibilityIcon /></IconButton>
                    </Link>

                    <IconButton aria-label='Edit' onClick={() => {
                        if (editable) {
                            recipe.ingredients = items
                            patchRecipe(recipe.id, recipe)
                            getAllIngredients()
                        }
                        toggleEditable()
                    }}>{editable ? <SaveIcon /> : <EditIcon />}</IconButton>
                    <IconButton aria-label='Delete' onClick={() => { deleteRecipe(recipe.id) }}><DeleteIcon /></IconButton>
                    <IconButton aria-label='Expand'
                        onClick={() => {
                            toggleVisible()
                        }}>
                        {visible ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={visible} timeout='auto'>
                <List component='div' disablePadding>
                    {ings?.map((ing, id) => (
                        <Ingredient
                            ingredient={ing}
                            id={id}
                            editable={editable}
                            checkboxInitialState={recipe.ingredients.includes(ing.id)}
                            key={id}
                            addOrDeleteItem={addOrDeleteItem} />
                    ))}
                </List>
            </Collapse>
        </>
    )
}