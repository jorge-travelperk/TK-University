import React, { useContext } from 'react'
import useToggleState from './hooks/useToggleState'
import { makeStyles } from '@material-ui/core/styles';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { IconButton } from '@material-ui/core';
import { IngredientContext } from './contexts/ingredients.context';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Ingredient({ ingredient, editable, checkboxInitialState, fromForm, addOrDeleteItem }) {
    const classes = useStyles();

    const [selected, toggleSelected] = useToggleState(checkboxInitialState)
    const { deleteIngredient } = useContext(IngredientContext)

    return (
        <ListItem button className={classes.nested} key={ingredient.id}>
            <ListItemIcon>
                <Checkbox
                    disabled={!editable}
                    edge="start"
                    onChange={() => { addOrDeleteItem(ingredient.id) }}
                    checked={selected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': ingredient.name }}
                    onClick={toggleSelected}
                />
            </ListItemIcon>
            <ListItemText primary={ingredient.name} />
            {fromForm && <ListItemSecondaryAction>
                <IconButton aria-label='Delete' onClick={() => { deleteIngredient(ingredient.id) }}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
    )
}