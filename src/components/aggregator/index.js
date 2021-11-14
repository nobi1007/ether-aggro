import { Link } from "react-router-dom";
import ArowBackIcon from "@rsuite/icons/ArowBack";

import DynamicTable from "../dynamic-table";
import { useAggregatorComp } from "./hooks";
import DetailForm from "./partials/detail-form";
import AddressDetails from "./partials/address-details";
import "./styles.css";

export default function AggregatorComp() {
    const { onDetailFormSubmit, selectedAddressObject, isFormSubmitting } =
        useAggregatorComp();

    return (
        <div className="main-container">
            <div className="heading-container">
                <div className="back-cta">
                    <Link to="/">
                        <ArowBackIcon className="back-cta-icon" />
                    </Link>
                </div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Infura Data Aggregator
                </div>
                <div className="back-cta"></div>
            </div>
            <div className="address-details-container">
                <AddressDetails data={selectedAddressObject} />
            </div>
            <div className="upper-body">
                <div className="upper-body-left">
                    <DynamicTable
                        isLoading={isFormSubmitting}
                        blockNumber={selectedAddressObject?.blockNumber}
                    />
                </div>
                <div className="upper-body-right">
                    <DetailForm onFormSubmit={onDetailFormSubmit} />
                </div>
            </div>
        </div>
    );
}
