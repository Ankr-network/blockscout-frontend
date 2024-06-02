import { useState } from 'react';

import { ANKR_PAYMENT_NETWORK } from 'modules/payments/const';
import { ECurrency } from 'modules/payments/types';
import { selectNetworks } from 'modules/payments/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseNetworkProps {
  currency: ECurrency;
}

export const useNetwork = ({ currency }: IUseNetworkProps) => {
  const [network, setNetwork] = useState(ANKR_PAYMENT_NETWORK);

  const networks = useAppSelector(state => selectNetworks(state, currency));

  const handleNetworkChange = setNetwork;

  return { handleNetworkChange, network, networks };
};
