import { EBlockchain } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IUsePaygContractAddressProps {
  currency: ECurrency;
  network: EBlockchain;
}

export const usePaygContractAddress = ({
  currency,
  network,
}: IUsePaygContractAddressProps) => {
  const { depositContractAddress: paygContractAddress } = useAppSelector(
    state => selectPaymentOptionsByNetworkAndCurrency(state, network, currency),
  );

  return { paygContractAddress };
};
