import {
  IGetCryptoPaymentOptionsParams,
  IGetCryptoPaymentOptionsResult,
} from 'multirpc-sdk';

import { IUseQueryProps } from 'store/queries/types';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPaymentOptions },
  useFetchPaymentOptionsQuery,
  useLazyFetchPaymentOptionsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPaymentOptions: build.query<
      IGetCryptoPaymentOptionsResult,
      IGetCryptoPaymentOptionsParams | void
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const { result: data } = await service
          .getAccountingGateway()
          .getCryptoPaymentOptions(params);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectState: selectPaymentOptionsState,
  selectData: selectPaymentOptions,
  selectLoading: selectPaymentOptionsLoading,
} = createQuerySelectors({ endpoint: fetchPaymentOptions });

export interface IUsePaymentOptionsProps
  extends IUseQueryProps,
    IGetCryptoPaymentOptionsParams {}

export const usePaymentOptions = ({
  skipFetching,
  ...params
}: IUsePaymentOptionsProps | void = {}) => {
  const { refetch } = useFetchPaymentOptionsQuery(
    getQueryParams({ params, skipFetching }),
  );

  const paymentOptions = useAppSelector(selectPaymentOptions);
  const isLoading = useAppSelector(selectPaymentOptionsLoading);

  return { paymentOptions, isLoading, refetch };
};
