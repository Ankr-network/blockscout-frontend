import { skipToken } from '@reduxjs/toolkit/dist/query';

import { IUseQueryProps } from 'store/queries/types';

export interface IGetQueryParamsParams<Params> extends IUseQueryProps {
  params: Params;
}

export const getQueryParams = <Params>({
  params,
  skipFetching,
}: IGetQueryParamsParams<Params>) => (skipFetching ? skipToken : params);
