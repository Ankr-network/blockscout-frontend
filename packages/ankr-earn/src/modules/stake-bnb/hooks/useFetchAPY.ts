import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';
import { ResponseData } from 'modules/common/types/ResponseData';
import { fetchAPY } from '../actions/fetchAPY';
import { YEARLY_INTEREST } from '../const';

const STATIC_VAL: BigNumber = new BigNumber(YEARLY_INTEREST / 100);

export const useFetchAPY = (): BigNumber => {
  const { data: apyVal } = useQuery<ResponseData<typeof fetchAPY>>({
    action: fetchAPY,
    defaultData: ZERO,
    type: fetchAPY,
  });

  return apyVal.isZero() ? STATIC_VAL : apyVal;
};
