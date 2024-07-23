export const getShellCodeSampleWithUrl = (
  url?: string,
) => `curl --location --request POST '${
  url || 'https://rpc.ankr.com/multichain'
}' \\
--header 'Content-Type: application/json' \\
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "ankr_getAccountBalance",
    "params": {
        "blockchain": [
            "bsc",
            "eth",
            "polygon",
            "avalanche"
        ],
        "walletAddress": "0xfa9019df60d3c710d7d583b2d69e18d412257617"
    }
}'`;
