import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    }
}

const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

export const orderStart = (token, orderData) => {
    return dispatch => {
        dispatch(orderInit());
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch(orderSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch(orderFail( error ));
            } );
    }
}

export const orderPurchased = () => {
    return {
        type: actionTypes.ORDER_PURCHASED
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

const fetchOrderfail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"' )
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderfail(error));
            });
    }
}
