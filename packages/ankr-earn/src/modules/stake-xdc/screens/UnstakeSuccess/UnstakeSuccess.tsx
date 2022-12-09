import { UnstakeSuccess as BaseUnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';

import { useUnstakeSuccess } from './hooks/useUnstakeSuccess';

export const UnstakeSuccess = (): JSX.Element => {
  const {
    amount,
    destinationAddress,
    infoLabel,
    title,
    tokenName,
    transactionHash,
  } = useUnstakeSuccess();

  return (
    <BaseUnstakeSuccess
      amount={amount}
      destinationAddress={destinationAddress}
      infoText={infoLabel}
      title={title}
      tokenName={tokenName}
      txHash={transactionHash}
    />
  );
};
