export const getPythonCodeSample = () => `from ankr import Ankr

// Initialize the SDK. Get your individual endpoint here https://www.ankr.com/rpc/advanced-api and provide it to the AnkrWeb3 class.
AnkrWeb3("YOUR-TOKEN")

// Get token balances of address with USD prices among multiple chain
assets = ankr_w3.token.get_account_balance(
    wallet_address="0x77A859A53D4de24bBC0CC80dD93Fbe391Df45527",
    blockchain=["eth", "bsc"],
)
`;
