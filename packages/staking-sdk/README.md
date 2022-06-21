# staking-sdk

### Install

```bash
# yarn
yarn add @ankr.com/staking-sdk
```

```bash
# npm
npm i @ankr.com/staking-sdk
```

### Examples of usage:

```typescript
// stake aMATICc token
import { PolygonSDK } from '@ankr.com/staking-sdk';

const sdk = await PolygonSDK.getInstance();

const { txHash } = await sdk.stake(new BigNumber(1_200), 'aMATICc');
```

```typescript
// unstake aMATICb token
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
