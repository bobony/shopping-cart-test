import React from 'react';
var unqiueProducts = (arr, key) => {

    return [...new Map(arr.map(item => [item[key], item])).values()]
}
let initialState = {
    items: [],
    qty: []
};
export const ProductStore = React.createContext(initialState);

function productReducer(state, action) {
    switch (action.type) {
        case 'CART':
            return {
                ...state,
                items: unqiueProducts([...state.items, action.item], 'id')
            };
        case 'QUANTITY':
            return {
                ...state,
                qty: action.qty
            };
        default:
            return state;
    }
};

export function ProductStoreProvider(props) {
    const [store, dispatch] = React.useReducer(productReducer, initialState);
    const value = { store, dispatch };
    return <ProductStore.Provider value={value}>{props.children}</ProductStore.Provider>;
}