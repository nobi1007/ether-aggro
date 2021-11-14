import "../styles.css";

export default function AddressDetails({ data = {} }) {
    const {
        addressId,
        coinsBalanceInHex,
        coinsBalanceInWei,
        coinsBalanceInEther,
    } = data;
    return (
        <>
            <div className="each-row">
                <div className="each-row-key"> Address Id:</div>{" "}
                <div className="each-row-value">{addressId}</div>
            </div>
            <div className="each-row">
                <div className="each-row-key"> Coins Balance (in Hex):</div>{" "}
                <div className="each-row-value">{coinsBalanceInHex}</div>
            </div>
            <div className="each-row">
                <div className="each-row-key"> Coins Balance (in Wei):</div>{" "}
                <div className="each-row-value">{coinsBalanceInWei}</div>
            </div>
            <div className="each-row">
                <div className="each-row-key"> Coins Balance (in Ether):</div>{" "}
                <div className="each-row-value">{coinsBalanceInEther}</div>
            </div>
        </>
    );
}
