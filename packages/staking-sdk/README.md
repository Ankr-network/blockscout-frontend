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

>To choose testsnet contracts use `REACT_APP_API_ENV=staging` environment variable. For mainnet - use `REACT_APP_API_ENV=prod`.

### Examples of usage:

```typescript
// stake aMATICc token
import { PolygonSDK } from '@ankr.com/staking-sdk';

const sdk = await PolygonSDK.getInstance();

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aMATICc');
```

```typescript
// unstake aMATICc token
import { PolygonSDK } from '@ankr.com/staking-sdk';

const sdk = await PolygonSDK.getInstance();

await sdk.unstake(new BigNumber(1_200), 'aMATICc');
```

```typescript
// switch aMATICb and aMATICc
import { PolygonSDK } from '@ankr.com/staking-sdk';

const sdk = await PolygonSDK.getInstance();

const lockResponse = await sdk.lockShares({ amount: new BigNumber(2.65) });

const unlockResponse = await sdk.unlockShares({ amount: new BigNumber(1.98) });
```

```typescript
// Get MATIC transaction history
import { PolygonSDK } from '@ankr.com/staking-sdk';

const sdk = await PolygonSDK.getInstance();

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
