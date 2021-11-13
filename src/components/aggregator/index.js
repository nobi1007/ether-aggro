import "./styles.css";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import { Link } from "react-router-dom";
import DynamicTable from "../dynamic-table";

export default function AggregatorComp() {
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
                <div className="upper-body-left"></div>
                <div className="upper-body-right"></div>
            </div>
            <DynamicTable />
        </div>
    );
}
