import { Link } from "react-router-dom";
import { Button } from "rsuite";
import "./styles.css";

export default function DashboardComp() {
    return (
        <div className="dashboard">
            <div className="header-container">
                <span className="header-text">Infura Data Aggregator</span>
            </div>
            <div className="subheading-container">
                <span className="subheader-text">
                    A custom data aggregator which can aggregate data based
                    several field settings!
                </span>
            </div>
            <div className="features-container">
                <ul>
                    <li className="each-feature">
                        We can also use our own Infura's Project Key if you
                        already have.
                    </li>
                    <li className="each-feature">
                        We can put any valid block number (for which we want to
                        aggregate the data), and also <code>all</code> for all
                        aggregated data so far. And, if it is{" "}
                        <code>latest</code> applicable data will be populated in
                        interval of 10 seconds.
                    </li>
                    <li className="each-feature">
                        Also, all data is aggregated for an address.{" "}
                        <em>So address is also customizable</em> 😃.
                    </li>
                </ul>
            </div>
            <div style={{ width: "40vw" }}>
                <Link to="/aggregator">
                    <Button style={{ width: "100%" }} appearance="primary">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}
