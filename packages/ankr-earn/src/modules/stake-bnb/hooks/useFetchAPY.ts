import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { ResponseData } from 'modules/common/types/ResponseData';

import { fetchAPY } from '../actions/fetchAPY';

export const useFetchAPY = (): BigNumber => {
  const { data: apyVal } = useQuery<ResponseData<typeof fetchAPY>>({
    type: fetchAPY,
    action: fetchAPY,
    defaultData: ZERO,
  });

  return apyVal;
};
