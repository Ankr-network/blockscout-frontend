import BigNumber from 'bignumber.js';

export interface IStakable {
  stake: (amount: BigNumber, token: string) => Promise<{ txHash: string }>;
  unstake: (amount: BigNumber, token: string) => Promise<void>;
  getMinimumStake: () => Promise<BigNumber>;
  getPendingClaim: () => Promise<BigNumber>;
  getPendingData: () => Promise<IPendingData>;
  getTxEventsHistory: () => Promise<ITxEventsHistoryData>;
}

export interface IPendingData {
  pendingBond: BigNumber;
  pendingCertificate: BigNumber;
}

export interface ITxEventsHistoryData {
  completedBond: ITxEventsHistoryGroupItem[];
  completedCertificate: ITxEventsHistoryGroupItem[];
  pendingBond: ITxEventsHistoryGroupItem[];
  pendingCertificate: ITxEventsHistoryGroupItem[];
}

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}
