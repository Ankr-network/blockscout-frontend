import { useQuery } from '@redux-requests/react';

import { ResponseData } from 'modules/common/types/ResponseData';

import {
  fetchPolkadotAccounts,
  IFetchPolkadotAccountsDataItem,
} from '../actions/fetchPolkadotAccounts';

export type TPolkadotAccounts = Array<IFetchPolkadotAccountsDataItem | void>;

interface IUseFetchPolkadotAccountsData {
  isLoading: boolean;
  polkadotAccounts: TPolkadotAccounts;
}

export const useFetchPolkadotAccounts = (): IUseFetchPolkadotAccountsData => {
  const {
    loading: isLoading,
    data: { polkadotAccounts },
  } = useQuery<ResponseData<typeof fetchPolkadotAccounts>>({
    defaultData: {
      polkadotAccounts: [],
    },
    type: fetchPolkadotAccounts,
  });

  return {
    isLoading,
    polkadotAccounts,
  };
};
