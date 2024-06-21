import { EBlockchain } from 'multirpc-sdk';
import { OverlaySpinner } from '@ankr.com/ui';

import { ECurrency, EPaymentType, INetwork } from 'modules/payments/types';
import {
  IOneTimeAmountProps,
  OneTimeAmount,
} from 'modules/payments/components/PaymentForm/components/OneTimeAmount';
import { NetworkSelect } from 'modules/payments/components/NetworkSelect';
import { PaymentInfo } from 'modules/payments/components/PaymentInfo';
import { Placeholder } from 'modules/common/components/Placeholder';
import { SeparatedList } from 'modules/payments/components/SeparatedList';
import { TotalPaymentInfo } from 'modules/payments/components/TotalPaymentInfo';
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
  isLoading: boolean;
  network: EBlockchain;
  networks: INetwork[];
  onNetworkChange?: (network: EBlockchain) => void;
  oneTimeAmountProps: IOneTimeAmountProps;
  totalAmount: number;
}

export const TxDetails = ({
  allowanceFeeDetails,
  amount,
  className,
  currency,
  depositFeeDetails,
  hasEnoughTokenBalance,
  isLoading,
  network,
  networks,
  onNetworkChange,
  oneTimeAmountProps,
  totalAmount,
}: ITxDetailsProps) => {
  const totalFeeDetails = useTotalFeeDetails({
    allowanceFeeDetails,
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
        onNetworkChange={onNetworkChange}
        options={networks}
      />
      <Placeholder
        hasPlaceholder={isLoading}
        placeholder={<OverlaySpinner size={58} />}
      >
        <SeparatedList shouldRenderFirstDivider={false}>
          <Placeholder
            hasPlaceholder={hasConnectedAddress && !hasEnoughTokenBalance}
            placeholder={<InsufficientBalanceAlert />}
          >
            <TxFees
              allowanceFeeDetails={allowanceFeeDetails}
              depositFeeDetails={depositFeeDetails}
              isWalletConnected={hasConnectedAddress}
              network={network}
            />
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
      </Placeholder>
    </SeparatedList>
  );
};
