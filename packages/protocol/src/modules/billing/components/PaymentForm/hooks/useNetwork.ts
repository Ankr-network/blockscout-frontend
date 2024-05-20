import { useCallback, useEffect, useMemo, useState } from 'react';
import { EBlockchain, Token } from 'multirpc-sdk';

import { selectPaymentOptions } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { ECurrency } from 'modules/billing/types';
import { ANKR_TOP_UP_NETWORK } from 'modules/billing/const';

import { INetworkSelectOption } from '../../NetworkSelect';

export const useNetwork = (currency: ECurrency) => {
  const [network, setNetwork] = useState(EBlockchain.eth);

  const paymentOptionsData = useAppSelector(selectPaymentOptions);

  const networkOptions: INetworkSelectOption[] = useMemo(() => {
    const paymentOptions = paymentOptionsData?.result.options ?? [];

    if (currency === ECurrency.ANKR) {
      return [{ value: ANKR_TOP_UP_NETWORK }];
    }

    return paymentOptions
      .filter(option =>
        option.tokens
          .map(token => token.token_symbol)
          .includes(currency as unknown as Token),
      )
      .map(option => ({
        value: option.blockchain,
      }));
  }, [currency, paymentOptionsData]);

  useEffect(() => {
    if (networkOptions.length) {
      setNetwork(networkOptions[0].value);
    }
  }, [networkOptions]);

  const handleNetworkChange = useCallback(
    (newNetwork: EBlockchain) => setNetwork(newNetwork),
    [setNetwork],
  );

  return {
    network,
    networkOptions,
    handleNetworkChange,
  };
};
