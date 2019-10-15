
const addTocart = (item, dispatch) =>
    dispatch({
        type: 'CART',
        item
    })

const cartQuantity = (qty, dispatch) => dispatch({
    type: 'QUANTITY',
    qty
})

export {
    addTocart,
    cartQuantity
};