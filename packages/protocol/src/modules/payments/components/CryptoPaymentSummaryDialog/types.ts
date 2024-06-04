import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, IFeeDetails, INetwork } from 'modules/payments/types';

import { IOneTimeAmountProps } from '../PaymentForm/components/OneTimeAmount';

export interface ICryptoPaymentSummaryDialogCommonProps {
  allowanceFeeDetails?: IFeeDetails;
  amount: number;
  currency: ECurrency;
  depositFeeDetails?: IFeeDetails;
  handleNetworkChange: (network: EBlockchain) => void;
  hasEnoughTokenBalance: boolean;
  isAccountChangedOnDepositStep: boolean;
  isLoading: boolean;
  isWalletAccountConnecting: boolean;
  network: EBlockchain;
  networks: INetwork[];
  oneTimeAmountProps: IOneTimeAmountProps;
  totalAmount: number;
}
