import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';

import { INetworkSelectOption } from '../NetworkSelect';

export interface ICryptoPaymentSummaryDialogCommonProps {
  amount: number;
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
  hasEnoughTokenBalance: boolean;
  isAccountChangedOnDepositStep: boolean;
  isWalletTokenBalanceLoading: boolean;
  totalAmount: number;
  network: EBlockchain;
  networkOptions: INetworkSelectOption[];
  handleNetworkChange: (network: EBlockchain) => void;
}
