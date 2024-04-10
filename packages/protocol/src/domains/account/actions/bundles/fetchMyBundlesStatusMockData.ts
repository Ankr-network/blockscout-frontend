import { BundleType, MyBundleStatus } from 'multirpc-sdk';

export const fetchMyBundlesStatusMockData: MyBundleStatus[] = [
  {
    bundleId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    expires: 1713990095,
    paymentId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    counters: [
      {
        blockchainPaths: '*',
        count: '19999980',
        type: BundleType.QTY,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleType.QTY,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleType.QTY,
      },
    ],
  },
  {
    bundleId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    expires: 1712990095,
    paymentId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    counters: [
      {
        blockchainPaths: '*',
        count: '0',
        type: BundleType.QTY,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleType.QTY,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleType.QTY,
      },
    ],
  },
  {
    bundleId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    expires: 1712990095,
    paymentId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    counters: [
      {
        blockchainPaths: '*',
        count: '3000000000',
        type: BundleType.COST,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleType.COST,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleType.COST,
      },
    ],
  },
  {
    bundleId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    expires: 1712990095,
    paymentId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    counters: [
      {
        blockchainPaths: '*',
        count: '0',
        type: BundleType.COST,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleType.COST,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleType.COST,
      },
    ],
  },
];
