import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";

const DynamicTable = ({ isLoading = false, blockNumber }) => {
    const transactionDetailsData = useSelector(
        ({ transactionDetails: { data = {} } = {} }) => data
    );
    const data = useMemo(() => {
        return Object.values(transactionDetailsData)
            .map((eachObject, index) => {
                return {
                    ...eachObject,
                    id: index + 1,
                };
            })
            .filter((eachObject) =>
                blockNumber.toLowerCase() === "all"
                    ? true
                    : eachObject.blockNumber === blockNumber
            );
    }, [transactionDetailsData, blockNumber]);

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === "string") {
                    x = x.charCodeAt();
                }
                if (typeof y === "string") {
                    y = y.charCodeAt();
                }
                if (sortType === "asc") {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    return (
        <Table
            autoHeight
            data={getData()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading || isLoading}
            onRowClick={(data) => {
                console.log(data);
            }}
            style={{ borderRadius: "8px" }}
        >
            <Column width={70} align="center" fixed sortable>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column width={130} resizable sortable>
                <HeaderCell>Block Number</HeaderCell>
                <Cell dataKey="blockNumber" />
            </Column>

            <Column width={200} resizable sortable>
                <HeaderCell>Transaction Hash</HeaderCell>
                <Cell dataKey="txnHash" />
            </Column>

            <Column width={200} resizable sortable>
                <HeaderCell>From (Address)</HeaderCell>
                <Cell dataKey="from" />
            </Column>

            <Column width={200} resizable sortable>
                <HeaderCell>To (Address)</HeaderCell>
                <Cell dataKey="to" />
            </Column>

            <Column width={70} resizable sortable>
                <HeaderCell>Transaction Type</HeaderCell>
                <Cell dataKey="transactionType" />
            </Column>

            <Column width={200} resizable sortable>
                <HeaderCell>Value (in Ether)</HeaderCell>
                <Cell dataKey="valueInEther" />
            </Column>
        </Table>
    );
};

export default DynamicTable;
