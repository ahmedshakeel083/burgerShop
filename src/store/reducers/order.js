import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_SUCCESS:
            const newOrder = { ...action.orderData, id: action.orderId };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORDER_PURCHASED:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default: return state;
    }
}

export default reducer;