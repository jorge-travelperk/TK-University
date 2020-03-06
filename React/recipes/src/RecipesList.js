import React, { useEffect, useContext } from 'react'

import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Recipe from './Recipe'
import { RecipeContext } from './contexts/recipes.context'
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default function RecipesList() {
    const classes = useStyles();
    const { recipes, getAllRecipes, getRecipeBySubstring } = useContext(RecipeContext)

    useEffect(() => {
        getAllRecipes()
    }, [])

    return (
        <Paper style={{ marginBottom: '20px' }}>
            <List
                label='Recipes List'
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <h3>Current recipes list</h3>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={(e) => { getRecipeBySubstring(e.target.value) }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </ListSubheader>
                } component='div' disablePadding>
                {recipes.map((recipe, i) => (
                    <React.Fragment key={i}>
                        <Recipe recipe={recipe} />
                        {i < recipes.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    )
}