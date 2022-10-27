import { IWalletMeta } from '@ankr.com/provider-core';
import { TopUpStep } from 'domains/account/actions/topUp/const';

export interface ITopUpStepsProps {
  step: TopUpStep;
  onConfirm: () => void;
  loading: boolean;
  amount: string;
  hasCredentials: boolean;
  onReject: () => void;
  isRejectAllowanceLoading: boolean;
  transactionHash?: string;
  hasError?: boolean;
  walletMeta?: IWalletMeta;
}
