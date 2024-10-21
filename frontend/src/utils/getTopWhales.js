import axios from "axios";

const BITQUERY_API_URL = 'https://streaming.bitquery.io/graphql';
const BITQUERY_API_KEY = "BQYP7dp1t8kaynSXH0sK1glX0OsOpPdi";

const query = `
query WhalesMonitor($network: evm_network!, $count: Int!, $min: String!){
  EVM(network: $network) {
    Transactions(
      limit: {count: $count}
      orderBy: {descending: Block_Date}
      where: {Transaction: {CostInUSD: {ge: $min}}, TransactionStatus: {Success: true}, any: {}, Block: {}}
    ) {
      Transaction {
        From
        Hash
        To
        ValueInUSD
        Value
      }
      Receipt {
        ContractAddress
      }
      Block {
        Number
        Date
      }
    }
  }
}
`;

async function getTopTenWhalesOnBSC(count = 10) {
    const min = 1000000;
    try {
        const variables = {
            network: "bsc",
            count,
            min: min.toString()
        };
        console.log(variables);

        const response = await axios
            .post(
                BITQUERY_API_URL,
                {query, variables},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': BITQUERY_API_KEY
                    }
                }
            );

        return response.data.data.EVM.Transactions;
    } catch (e) {
        console.error('getTopWhales', e);
    }
}

export default getTopTenWhalesOnBSC;
