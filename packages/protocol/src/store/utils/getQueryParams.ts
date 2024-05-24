import { skipToken } from '@reduxjs/toolkit/dist/query';

import { IUseQueryProps } from 'store/queries/types';

export const getQueryParams = <Params extends IUseQueryProps>({
  skipFetching,
  ...params
}: Params) => (skipFetching ? skipToken : params);
