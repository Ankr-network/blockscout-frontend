import { BundleCounter, MyBundleStatus } from 'multirpc-sdk';

export const fetchMyBundlesStatusMockData: MyBundleStatus[] = [
  {
    bundleId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    expires: '1709978242361',
    paymentId: '0a5330a5-d420-417e-a99f-fd293ac65eeb',
    counters: [
      {
        blockchainPaths: '*',
        count: '19999980',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_QTY,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_QTY,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_QTY,
      },
    ],
  },
  {
    bundleId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    expires: '1709978242361',
    paymentId: '560fa71e-8052-402f-a698-fb1ad4f2ce4b',
    counters: [
      {
        blockchainPaths: '*',
        count: '3000000000',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_COST,
      },
      {
        blockchainPaths: 'solana:solana_devnet',
        count: '0',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_COST,
      },
      {
        blockchainPaths: 'multichain',
        count: '0',
        type: BundleCounter.BUNDLE_COUNTER_TYPE_COST,
      },
    ],
  },
];
