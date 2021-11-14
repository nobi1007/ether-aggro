import { createSlice } from "@reduxjs/toolkit";

export const transactionsByIdSlice = createSlice({
    name: "transactionDetails",
    initialState: {},
    reducers: {
        updateTransaction: (state, action) => {
            const { transactionId } = action.payload || {};
            state.data[transactionId] = {
                ...state[transactionId],
                ...action.payload,
            };
        },
        addTransactions: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
    },
});

export const { updateTransaction, addTransactions } =
    transactionsByIdSlice.actions;
export default transactionsByIdSlice.reducer;
