import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient("meat")
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ... state,
                ingredients: [... state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
        let newIngs = action.payload.map( i => {return new Ingredient(''+i)})
            return {
                ... state,
                ingredients: [... state.ingredients, ... newIngs]
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const afterDeleteIngredients = [... state.ingredients];
            afterDeleteIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ... state,
                ingredients: afterDeleteIngredients
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ing = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ... ing, ...action.payload 
            }
            const editedIngredients = [... state.ingredients];
            editedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                state,
                ingredients: editedIngredients
            };
        
        case ShoppingListActions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload]};
            return {
                ... state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };
        
        case ShoppingListActions.STOP_EDIT:
            return {
                ... state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }
};
