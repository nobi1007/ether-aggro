import { initialFormValues } from "../components/aggregator/hooks";

export function createClient(
    Web3,
    infuraProjectId = initialFormValues.infuraProjectId
) {
    const provider = new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${infuraProjectId}`
    );
    return new Web3(provider);
}

export function transactionChecker(
    web3,
    accountAddress = initialFormValues.address,
    blockNumber = initialFormValues.blockNumber
) {
    const account = accountAddress?.toLowerCase();
    return async function checkBlock() {
        let block = await web3.eth.getBlock(blockNumber);
        const batch = new web3.BatchRequest();
        const blocks = [];

        if (block && block?.transactions) {
            const total = block.transactions.length;
            let counter = 0;
            await new Promise(function (resolve, reject) {
                block.transactions.forEach((txHash) => {
                    batch.add(
                        web3.eth.getTransaction.request(
                            txHash,
                            (error, data) => {
                                if (error) return reject(error);
                                counter++;
                                blocks.push(data);
                                if (counter === total) resolve();
                            }
                        )
                    );
                });
                batch.execute();
            });
        }
        return blocks.filter(
            (eachTnxObj) =>
                eachTnxObj?.from?.toLowerCase() === account ||
                eachTnxObj?.to?.toLowerCase() === account
        );
    };
}
