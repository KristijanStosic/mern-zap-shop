import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// getState - we can grab everything in state with getState
export const addToCart = (id, quantity) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }