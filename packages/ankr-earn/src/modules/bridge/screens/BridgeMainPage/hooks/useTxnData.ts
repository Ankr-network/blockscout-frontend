import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';

import { ITxViewProps } from '../components/TxView';

export const useTxnData = (): ITxViewProps | undefined => {
  const query = useQueryParams();
  const [tx, setTx] = useState<ITxViewProps>();

  useProviderEffect(() => {
    const notarize = query.get('notarize');
    const queryTx = query.get('tx');
    const amount = query.get('amount');
    const chainIdFrom = query.get('chainIdFrom');
    const chainIdTo = query.get('chainIdTo');
    const token = query.get('token') as AvailableBridgeTokens;

    if (notarize || queryTx) {
      try {
        setTx({
          chainIdFrom: +`${chainIdFrom}`,
          chainIdTo: +`${chainIdTo}`,
          tx: `${queryTx}`,
          token,
          amount: new BigNumber(amount ?? 0),
        });
      } catch (error) {
        throw new Error(t('error.unexpected'));
      }
    }
  }, [query]);

  return tx;
};
