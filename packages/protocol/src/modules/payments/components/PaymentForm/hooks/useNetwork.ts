import { EBlockchain } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import { ANKR_PAYMENT_NETWORK } from 'modules/payments/const';
import { ECurrency } from 'modules/payments/types';
import { selectNetworks } from 'modules/payments/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseNetworkProps {
  currency: ECurrency;
  initialNetwork?: EBlockchain;
}

export const useNetwork = ({
  currency,
  initialNetwork = ANKR_PAYMENT_NETWORK,
}: IUseNetworkProps) => {
  const [network, setNetwork] = useState(initialNetwork);

  const networks = useAppSelector(state => selectNetworks(state, currency));

  const handleNetworkChange = setNetwork;

  const handleNetworkReset = useCallback(
    () => setNetwork(initialNetwork),
    [initialNetwork],
  );

  return { handleNetworkChange, handleNetworkReset, network, networks };
};
