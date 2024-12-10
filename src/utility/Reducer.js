import { Type } from "./ActionType";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  // fixed order of parameters
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item exists
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // Update the basket correctly with map

        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Return the updated item
            : item; // Return the item as is if it doesn't match
        });

        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };

      case Type.EMPTY_BASKET:
      return {
       ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      console.warn("Unknown action type:", action.type); // helpful debug message
      return state;
  }
};
