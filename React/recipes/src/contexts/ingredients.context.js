import React, { createContext } from 'react'
import useIngredientState from '../hooks/useIngredientState'

export const IngredientContext = createContext()

export function IngredientProvider(props) {
    const { ingredients, getAllIngredients, addIngredient, deleteIngredient } = useIngredientState()
    return (
        <IngredientContext.Provider value={{ ingredients, getAllIngredients, addIngredient, deleteIngredient }}>
            {props.children}
        </IngredientContext.Provider>
    )
}