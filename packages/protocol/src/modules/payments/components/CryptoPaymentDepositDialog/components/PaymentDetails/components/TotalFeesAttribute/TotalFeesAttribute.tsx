import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { IFeeDetails } from 'modules/payments/types';
import { TxAttribute } from 'modules/payments/components/TxAttribute';
import { defaultFeeDetails } from 'modules/payments/const';

export interface ITotalFeesAttributeProps {
  allowanceFeeDetails?: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  network: EBlockchain;
}

const labelKey = 'account.crypto-payment-deposit-dialog.total-fees-label';

export const TotalFeesAttribute = ({
  allowanceFeeDetails = defaultFeeDetails,
  depositFeeDetails,
  network,
}: ITotalFeesAttributeProps) => {
  const feeCrypto = allowanceFeeDetails.feeCrypto + depositFeeDetails.feeCrypto;
  const feeUSD = allowanceFeeDetails.feeUSD + depositFeeDetails.feeUSD;

  return (
    <TxAttribute label={t(labelKey)} labelVariant="subtitle2">
      <FeeAmount
        amountVariant="subtitle2"
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};
