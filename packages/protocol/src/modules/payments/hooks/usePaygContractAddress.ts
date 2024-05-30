import { EBlockchain } from 'multirpc-sdk';

import { CONFIG } from 'modules/api/MultiService';
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
  const { depositContractAddress } = useAppSelector(state =>
    selectPaymentOptionsByNetworkAndCurrency(state, network, currency),
  );

  const paygContractAddress =
    currency === ECurrency.ANKR
      ? CONFIG.payAsYouGoContractAddress
      : depositContractAddress;

  return { paygContractAddress };
};
