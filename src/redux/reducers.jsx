/** @format */

const initialState = {
  productData: {},
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return {
        ...state,
        productData: action.payload,
      }
    default:
      return state
  }
}

export default productReducer
