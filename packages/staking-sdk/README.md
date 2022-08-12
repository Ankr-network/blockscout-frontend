# staking-sdk

### Install

```bash
# yarn
yarn add @ankr.com/staking-sdk reselect
```

```bash
# npm
npm i @ankr.com/staking-sdk reselect
```

> To choose testsnet contracts use `REACT_APP_API_ENV=staging` environment variable. For mainnet - use `REACT_APP_API_ENV=prod`.

### Examples of usage:

Here is a codesandbox sample how to get balance using `@ankr.com/staking-sdk` [https://codesandbox.io/s/ankr-staking-sdk-e1jvvi](https://codesandbox.io/s/ankr-staking-sdk-e1jvvi)

```typescript
// stake aMATICc token
import { MaticEthSDK } from '@ankr.com/staking-sdk';

const sdk = await MaticEthSDK.getInstance();

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aMATICc');
```

```typescript
// unstake aMATICc token
import { MaticEthSDK } from '@ankr.com/staking-sdk';

const sdk = await MaticEthSDK.getInstance();

await sdk.unstake(new BigNumber(1_200), 'aMATICc');
```

```typescript
// switch aMATICb and aMATICc
import { MaticEthSDK } from '@ankr.com/staking-sdk';

const sdk = await MaticEthSDK.getInstance();

const lockResponse = await sdk.lockShares({ amount: new BigNumber(2.65) });

const unlockResponse = await sdk.unlockShares({ amount: new BigNumber(1.98) });
```

```typescript
// Get MATIC transaction history
import { MaticEthSDK } from '@ankr.com/staking-sdk';

const sdk = await MaticEthSDK.getInstance();

const history = await sdk.getTxEventsHistory();
```

```typescript
// stake aBNBc token
import { BinanceSDK } from '@ankr.com/staking-sdk';

const sdk = await BinanceSDK.getInstance();

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aBNBc');
```

```typescript
// unstake aBNBc token
import { BinanceSDK } from '@ankr.com/staking-sdk';

const sdk = await BinanceSDK.getInstance();

await sdk.unstake(new BigNumber(1_200), 'aBNBc');
```

```typescript
// switch aBNBb and aBNBc
import { BinanceSDK } from '@ankr.com/staking-sdk';

const sdk = await BinanceSDK.getInstance();

const lockResponse = await sdk.lockShares({ amount: new BigNumber(2.65) });

const unlockResponse = await sdk.unlockShares({ amount: new BigNumber(1.98) });
```

```typescript
// Get BNB transaction history
import { BinanceSDK } from '@ankr.com/staking-sdk';

const sdk = await BinanceSDK.getInstance();

const history = await sdk.getTxEventsHistory();
```

```typescript
// stake aETHc token
import { EthereumSDK } from '@ankr.com/staking-sdk';

const sdk = await EthereumSDK.getInstance();

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aETHc');
```

```typescript
// switch aETHc and aETHb
import { EthereumSDK } from '@ankr.com/staking-sdk';

const sdk = await EthereumSDK.getInstance();

const lockResponse = await sdk.lockShares({ amount: new BigNumber(2.65) });

const unlockResponse = await sdk.unlockShares({ amount: new BigNumber(1.98) });
```

```typescript
// User defined providers
import { MaticEthSDK, Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

const readProvider: Web3KeyReadProvider = { ... };
const writeProvider: Web3KeyWriteProvider = { ... };
const sdk = await MaticEthSDK.getInstance({ readProvider, writeProvider });

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aMATICc');
```
