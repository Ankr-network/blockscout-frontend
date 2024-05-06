import { OverlaySpinner } from '@ankr.com/ui';
import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import {
  INetworkSelectOption,
  NetworkSelect,
} from 'modules/billing/components/NetworkSelect';
import {
  IOneTimeAmountProps,
  OneTimeAmount,
} from 'modules/billing/components/PaymentForm/components/OneTimeAmount';
import { PaymentInfo } from 'modules/billing/components/PaymentInfo';
import { Placeholder } from 'modules/common/components/Placeholder';
import { SeparatedList } from 'modules/billing/components/SeparatedList';
import { TotalPaymentInfo } from 'modules/billing/components/TotalPaymentInfo';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import {
  IUseTotalFeeDetails,
  useTotalFeeDetails,
} from './hooks/useTotalFeeDetails';
import { InsufficientBalanceAlert } from '../InsufficientBalanceAlert';
import { TxFees } from '../TxFees';

export interface ITxDetailsProps extends IUseTotalFeeDetails {
  amount: number;
  className?: string;
  currency: ECurrency;
  hasEnoughTokenBalance: boolean;
  isWalletTokenBalanceLoading: boolean;
  totalAmount: number;
  network: EBlockchain;
  networkOptions: INetworkSelectOption[];
  oneTimeAmountProps: IOneTimeAmountProps;
  onNetworkChange: (network: EBlockchain) => void;
}

export const TxDetails = ({
  amount,
  approvalFeeDetails,
  className,
  currency,
  depositFeeDetails,
  hasEnoughTokenBalance,
  isWalletTokenBalanceLoading,
  totalAmount,
  network,
  networkOptions,
  oneTimeAmountProps,
  onNetworkChange,
}: ITxDetailsProps) => {
  const totalFeeDetails = useTotalFeeDetails({
    approvalFeeDetails,
    depositFeeDetails,
  });

  const { walletAddress: connectedAddress } = useWalletAddress();
  const hasConnectedAddress = Boolean(connectedAddress);

  const isAnkrPayment = currency === ECurrency.ANKR;
  const isUsdPayment = currency === ECurrency.USD;

  const isUsualView = isAnkrPayment || isUsdPayment;

  return (
    <SeparatedList className={className}>
      {isUsualView && (
        <PaymentInfo
          amount={amount}
          currency={currency}
          paymentType={EPaymentType.OneTime}
        />
      )}
      {!isUsualView && oneTimeAmountProps && (
        <OneTimeAmount
          {...oneTimeAmountProps}
          hasChips={false}
          hasDocsLink={false}
        />
      )}
      <NetworkSelect
        activeNetwork={network}
        options={networkOptions}
        onNetworkChange={onNetworkChange}
      />

      <Placeholder
        hasPlaceholder={isWalletTokenBalanceLoading}
        placeholder={<OverlaySpinner size={58} />}
      >
        <Placeholder
          hasPlaceholder={hasConnectedAddress && !hasEnoughTokenBalance}
          placeholder={<InsufficientBalanceAlert />}
        >
          <TxFees
            approvalFeeDetails={approvalFeeDetails}
            depositFeeDetails={depositFeeDetails}
            isWalletConnected={hasConnectedAddress}
            network={network}
          />
        </Placeholder>
      </Placeholder>
      {hasConnectedAddress && hasEnoughTokenBalance && (
        <TotalPaymentInfo
          amount={amount}
          currency={currency}
          feeDetails={totalFeeDetails}
          network={network}
          totalAmount={totalAmount}
        />
      )}
    </SeparatedList>
  );
};
