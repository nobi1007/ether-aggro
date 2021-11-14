import { configureStore } from "@reduxjs/toolkit";
import addressDetailsReducer from "./reducer/address-details";
import selectedAddressReducer from "./reducer/selected-address-slice";
import transactionDetailReducer from "./reducer/transaction-details";

export default configureStore({
    reducer: {
        addressDetails: addressDetailsReducer,
        selectedAddress: selectedAddressReducer,
        transactionDetails: transactionDetailReducer,
    },
});
