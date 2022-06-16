import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';

import { ITxViewProps } from '../components/TxView';

const requiredParams = ['tx', 'amount', 'chainIdFrom', 'chainIdTo', 'token'];

// todo: should be removed in favor of a separate route for this
export const useTxnData = (): ITxViewProps | undefined => {
  const query = useQueryParams();
  const [tx, setTx] = useState<ITxViewProps>();

  useProviderEffect(() => {
    const queryParams = requiredParams.reduce<string[]>((acc, param) => {
      const queryParam = query.get(param);
      if (queryParam) {
        acc.push(queryParam);
      }

      return acc;
    }, []);

    const isAllRequiedData = queryParams.length === requiredParams.length;

    if (!isAllRequiedData) {
      return;
    }

    const [txHash, amount, chainIdFrom, chainIdTo, token] = queryParams;

    try {
      setTx({
        chainIdFrom: +chainIdFrom,
        chainIdTo: +chainIdTo,
        tx: txHash,
        token: token as AvailableBridgeTokens,
        amount: new BigNumber(amount ?? 0),
      });
    } catch (error) {
      throw new Error(t('error.unexpected'));
    }
  }, [query]);

  return tx;
};
