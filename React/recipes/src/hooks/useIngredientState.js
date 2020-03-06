import { useState } from "react";
import axios from "axios";

export default initialIngredients => {
    const [ingredients, setIngredients] = useState([])
    const url = 'http://localhost:8000/api/recipes/ingredients/'

    function detailUrl(id) {
        return `${url}${id}/`
    }

    async function genericGet() {
        const res = await axios.get(url)
        setIngredients(res.data)
    }

    return {
        ingredients,
        getAllIngredients: () => {
            genericGet()
        },
        addIngredient: async newIngredient => {
            await axios.post(url, { 'name': newIngredient })
            genericGet()
        },
        deleteIngredient: async ingredientId => {
            await axios.delete(detailUrl(ingredientId))
            genericGet()
        }
    };
};
