export const getJsCodeSample = (
  url?: string,
) => `// npm install @ankr.com/ankr.js
import { AnkrProvider } from '@ankr.com/ankr.js';

// Setup provider AnkrProvider
const provider = new AnkrProvider(${url ? `'${url}'` : ''});

// Get token balances of address with USD prices among multiple chains
const balances = async () => {
    return await provider.getAccountBalance({
        blockchain: ['bsc', 'eth', 'polygon', 'avalanche'],
        walletAddress: '0xfa9019df60d3c710d7d583b2d69e18d412257617',
    });
};`;
