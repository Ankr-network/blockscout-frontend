export interface IReferralProgramSlice {
  referralCode?: string;
}

export interface IB2BReferralProgram {
  banner: string;
  blockchainName: string;
  bundleId: string;
  referralCode: string;
}

export enum ERewardTxsPeriod {
  AllTime = 'AllTime',
  LastMonth = 'LastMonth',
  LastWeek = 'LastWeek',
  LastYear = 'LastYear',
}
