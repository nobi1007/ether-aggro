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
                <h2>Dynamic Data Aggregator</h2>
                <div className="back-cta"></div>
            </div>
            <div className="upper-body">
                <div className="upper-body-left">
                    <AddressDetails data={selectedAddressObject} />
                </div>
                <div className="upper-body-right">
                    <DetailForm onFormSubmit={onDetailFormSubmit} />
                </div>
            </div>
            <DynamicTable isLoading={isFormSubmitting} />
        </div>
    );
}
