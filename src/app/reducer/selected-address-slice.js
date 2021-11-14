import { createSlice } from "@reduxjs/toolkit";

export const selectedAddressSlice = createSlice({
    name: "selectedAddress",
    initialState: {},
    reducers: {
        updateSelectedAddress: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateSelectedAddress } = selectedAddressSlice.actions;
export default selectedAddressSlice.reducer;
