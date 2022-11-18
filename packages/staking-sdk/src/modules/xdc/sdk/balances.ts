import { Web3KeyReadProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { getWeb3ReadableAmountFromWei, IWeb3BalanceProps } from '../../common';

export const getXDCBalance = async ({
  address,
  provider,
}: IWeb3BalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const web3 = provider.getWeb3();

  const amount = await web3.eth.getBalance(address);

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};
