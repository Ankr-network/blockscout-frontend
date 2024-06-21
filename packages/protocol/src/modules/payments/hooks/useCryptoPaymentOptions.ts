import { EBlockchain } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IUseCryptoPaymentOptionsProps {
  currency: ECurrency;
  network: EBlockchain;
}

export const useCryptoPaymentOptions = ({
  currency,
  network,
}: IUseCryptoPaymentOptionsProps) => {
  return useAppSelector(state =>
    selectPaymentOptionsByNetworkAndCurrency(state, network, currency),
  );
};
