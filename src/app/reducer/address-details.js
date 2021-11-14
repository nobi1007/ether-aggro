import { createSlice } from "@reduxjs/toolkit";

export const addressDetailsSlice = createSlice({
    name: "addressDetails",
    initialState: {},
    reducers: {
        updateAddress: (state, action) => {
            const { addressId } = action.payload || {};
            state[addressId] = { ...state[addressId], ...action.payload };
        },
    },
});

export const { updateAddress } = addressDetailsSlice.actions;
export default addressDetailsSlice.reducer;
