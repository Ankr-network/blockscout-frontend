import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

interface IUseHeader {
  balance?: BigNumber;
  isLoading: boolean;
  getTokensLink: string;
}

export const useHeader = (): IUseHeader => {
  return {
    balance: ZERO,
    isLoading: false,
    getTokensLink:
      'https://docs.gnosischain.com/validator-info/validator-deposits/convert-gno-to-mgno',
  };
};
