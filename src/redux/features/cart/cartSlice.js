import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount:10,
    total:0,
    isLoading: true
};

export const getCartItems = createAsyncThunk("cart/getCartItems",()=>{
    return fetch('https://course-api.com/react-useReducer-cart-project')
    .then(res => res.json())
    .catch(err => console.log(err))
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: state => {
            state.cartItems = [];
        },
        removeItem: (state,action)=>{
            const {payload} = action;
            state.cartItems = state.cartItems.filter(item => item.id !== payload);
        },
        increase: (state,action)=>{
            const {id} = action.payload;
            const cartItem = state.cartItems.find(item => item.id === id);
            cartItem.amount += 1;
        },
        decrease: (state,action)=>{
            const {id} = action.payload;
            const cartItem = state.cartItems.find(item => item.id === id);
            cartItem.amount -= 1;
        },
        calculateTotal: (state)=>{
            let total = state.cartItems.reduce((sum,curVa)=>{ 
                return sum + (curVa.amount * curVa.price)
            },0)
            let amount = state.cartItems.reduce((sum,curVa)=>{ 
                return sum + curVa.amount
            },0)
           state.amount = amount;
           state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },[getCartItems.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.cartItems = [...action.payload];
        },[getCartItems.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});
// console.log(cartSlice)

export const {clearCart,removeItem, increase, decrease, calculateTotal} = cartSlice.actions;

export default cartSlice.reducer;