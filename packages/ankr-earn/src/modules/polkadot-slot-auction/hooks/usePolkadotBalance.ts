import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ResponseData } from 'modules/common/types/ResponseData';
import { fetchPolkadotBalance } from '../actions/fetchPolkadotBalance';
import { useSlotAuctionSdk } from './useSlotAuctionSdk';

export const usePolkadotBalance = (): {
  balance: BigNumber;
  minSafeBalance: BigNumber;
  symbol: string;
} => {
  const { networkType } = useSlotAuctionSdk();
  const {
    data: { balance, minSafeBalance, symbol },
  } = useQuery<ResponseData<typeof fetchPolkadotBalance>>({
    defaultData: {
      balance: new BigNumber(0),
      minSafeBalance: new BigNumber(0),
      symbol: networkType,
    },
    type: fetchPolkadotBalance,
  });

  return {
    balance,
    minSafeBalance,
    symbol,
  };
};
