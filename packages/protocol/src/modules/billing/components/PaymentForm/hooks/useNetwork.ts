import { useCallback, useEffect, useMemo, useState } from 'react';
import { EBlockchain, Token } from 'multirpc-sdk';

import { selectPaymentOptions } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { ECurrency } from 'modules/billing/types';

import { INetworkSelectOption } from '../../NetworkSelect';

export const useNetwork = (currency: ECurrency) => {
  const [network, setNetwork] = useState(EBlockchain.eth);

  const isANKRCurrencyActive = currency === ECurrency.ANKR;

  const paymentOptionsData = useAppSelector(selectPaymentOptions);

  const networkOptions: INetworkSelectOption[] = useMemo(() => {
    const paymentOptions = paymentOptionsData?.result.options ?? [];

    if (isANKRCurrencyActive) {
      return [{ value: EBlockchain.eth }];
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
  }, [currency, paymentOptionsData, isANKRCurrencyActive]);

  useEffect(() => {
    if (networkOptions.length) {
      setNetwork(networkOptions[0].value);
    }

    if (isANKRCurrencyActive) {
      setNetwork(EBlockchain.eth);
    }
  }, [currency, networkOptions, isANKRCurrencyActive]);

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
