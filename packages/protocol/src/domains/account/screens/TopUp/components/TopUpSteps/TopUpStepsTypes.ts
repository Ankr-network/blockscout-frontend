import { IWalletMeta } from '@ankr.com/provider';

import { TopUpStep } from 'domains/account/actions/topUp/const';

export interface ITopUpStepsProps {
  amount: string;
  hasPrivateAccess: boolean;
  hasError?: boolean;
  isRejectAllowanceLoading: boolean;
  loading: boolean;
  loadingWaitTransactionConfirming: boolean;
  onConfirm: () => void;
  onReject: () => void;
  step: TopUpStep;
  transactionHash?: string;
  walletMeta?: IWalletMeta;
}
