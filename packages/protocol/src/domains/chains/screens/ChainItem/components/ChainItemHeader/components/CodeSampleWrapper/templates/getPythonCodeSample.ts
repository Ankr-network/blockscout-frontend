export const getPythonCodeSample = () => `from ankr import AnkrWeb3
from ankr.types import GetAccountBalanceRequest

# Initialize the SDK. Get your individual endpoint here https://www.ankr.com/rpc/advanced-api and provide it to the AnkrWeb3 class.
ankr_w3 = AnkrWeb3("YOUR-TOKEN")

# Get token balances of address with USD prices among multiple chains
assets = ankr_w3.token.get_account_balance(
    request = GetAccountBalanceRequest(
        walletAddress="0x77A859A53D4de24bBC0CC80dD93Fbe391Df45527"
    )
)
`;
