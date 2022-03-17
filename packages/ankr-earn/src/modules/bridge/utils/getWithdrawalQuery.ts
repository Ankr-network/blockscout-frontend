import { stringify } from 'common';

import { SupportedChainIDS } from '../../common/const';
import { AvailableBridgeTokens } from '../types';

interface IGetQuery {
  tx: string;
  token: AvailableBridgeTokens;
  chainIdFrom: SupportedChainIDS;
  chainIdTo: SupportedChainIDS;
  amount?: string;
}

export function getWithdrawalQuery(
  params: IGetQuery,
  currentQuery = '',
): string {
  return stringify(params, currentQuery);
}
