import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { updateAddress } from "../../app/reducer/address-details";
import { updateSelectedAddress } from "../../app/reducer/selected-address-slice";
import { addTransactions } from "../../app/reducer/transaction-details";
import { createClient, transactionChecker } from "../../utils/web3-client";
import { getAddressBalance } from "./api";

export const initialFormValues = {
    infuraProjectId: "b0a57dabfc404c608417aba317431782",
    address: "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
    blockNumber: "13531938",
};

export const useAggregatorComp = () => {
    const interval = useRef();
    const dispatch = useDispatch();
    const addressDetailsObject = useSelector(
        ({ addressDetails = {} }) => addressDetails
    );
    const selectedAddressId = useSelector(
        ({ selectedAddress: { value: selectedAddressId = "" } = {} }) =>
            selectedAddressId
    );
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const selectedAddressObject = useMemo(
        () => addressDetailsObject[selectedAddressId],
        [selectedAddressId, addressDetailsObject]
    );

    const addTransactionObjects = (
        newTransactions = [],
        blockNumber,
        address
    ) => {
        const updatedTxnArray = newTransactions?.map((eachObj) => {
            return {
                blockNumber,
                txnHash: eachObj.hash,
                from: eachObj.from,
                to: eachObj.to,
                transactionType:
                    eachObj.from?.toLowerCase() === address?.toLowerCase()
                        ? "OUT"
                        : "IN",
                valueInEther: eachObj.value / 10 ** 18,
                address,
            };
        });
        let updatedTxnObject = {};
        updatedTxnArray.forEach((eachObject) => {
            updatedTxnObject[eachObject.txnHash] = eachObject;
        });
        dispatch(addTransactions(updatedTxnObject));
        dispatch(
            updateAddress({
                addressId: address,
                transactionIds: Object.keys(updatedTxnObject),
            })
        );
    };

    function intervalSetter(client, address, blockNumber, infuraProjectId) {
        getAddressBalance(infuraProjectId, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: 1,
        }).then(({ data = {} }) => {
            console.log(data);
            const coinsBalanceInHex = data?.result;
            const coinsBalanceInWei = parseInt(
                coinsBalanceInHex.slice(2, coinsBalanceInHex.length),
                16
            );
            const coinsBalanceInEther = coinsBalanceInWei / 10 ** 18;
            dispatch(updateSelectedAddress(address));
            dispatch(
                updateAddress({
                    addressId: address,
                    coinsBalanceInHex,
                    coinsBalanceInWei,
                    coinsBalanceInEther,
                    transactionIds: [],
                })
            );
            if (blockNumber === "latest") {
                interval.current = setInterval(() => {
                    setIsFormSubmitting(true);
                    transactionChecker(client, address, blockNumber)().then(
                        (val) => {
                            console.log(val, "nnn");
                            addTransactionObjects(val, blockNumber, address);
                            setIsFormSubmitting(false);
                        }
                    );
                }, 10000);
            } else {
                transactionChecker(client, address, blockNumber)().then(
                    (val) => {
                        console.log(val, "norman");
                        addTransactionObjects(val, blockNumber, address);
                        setIsFormSubmitting(false);
                    }
                );
            }
        });
    }

    const onDetailFormSubmit = (formValues) => {
        setIsFormSubmitting(true);
        const web3Client = createClient(Web3, formValues?.infuraProjectId);
        clearInterval(interval.current);
        intervalSetter(
            web3Client,
            formValues.address,
            formValues.blockNumber,
            formValues?.infuraProjectId
        );
    };

    useEffect(() => {
        const web3Client = createClient(
            Web3,
            initialFormValues?.infuraProjectId
        );
        intervalSetter(
            web3Client,
            initialFormValues.address,
            initialFormValues.blockNumber,
            initialFormValues?.infuraProjectId
        );
    }, []);

    return {
        onDetailFormSubmit,
        selectedAddressObject,
        isFormSubmitting,
    };
};
