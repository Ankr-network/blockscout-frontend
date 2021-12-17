import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';
import { useQuery } from '@redux-requests/react';
import { ResponseData } from 'modules/common/types/ResponseData';
import {
  fetchCrowdloanBalances,
  IFetchCrowdloanBalancesItem,
} from '../actions/fetchCrowdloanBalances';
import { fetchCrowdloanById } from '../actions/fetchCrowdloanById';
import { ICrowdloanByStatus } from '../actions/fetchCrowdloansByStatus';
import {
  fetchMyRewardCrowdloans,
  IFetchMyRewardCrowdloansItem,
} from '../actions/fetchMyRewardCrowdloans';
import { fetchProjectsListCrowdloans } from '../actions/fetchProjectsListCrowdloans';

export type TBalances = Record<number, IFetchCrowdloanBalancesItem>;

interface ICrowdloans<T> {
  crowdloans: Array<T | void>;
  error: Error | null;
  isLoading: boolean;
}

export const useCrowdloanById = (
  crowdloanId: number,
): {
  crowdloan: ICrowdloanType;
  isLoading: boolean;
} => {
  const { data } = useQuery<ResponseData<typeof fetchCrowdloanById>>({
    action: fetchCrowdloanById,
    defaultData: {
      crowdloan: null,
      isLoading: true,
    },
    type: fetchCrowdloanById,
    variables: [crowdloanId],
  });

  return data;
};

export const useProjectsListCrowdloans = (): ICrowdloans<ICrowdloanByStatus> => {
  const { data: crowdloans, error, loading: isLoading } = useQuery<
    ResponseData<typeof fetchProjectsListCrowdloans>
  >({
    action: fetchProjectsListCrowdloans,
    defaultData: [],
    type: fetchProjectsListCrowdloans,
  });

  return {
    crowdloans,
    error,
    isLoading,
  };
};

export const useMyRewardCrowdloans = (): ICrowdloans<IFetchMyRewardCrowdloansItem> => {
  const { data: crowdloans, error, loading: isLoading } = useQuery<
    ResponseData<typeof fetchMyRewardCrowdloans>
  >({
    action: fetchMyRewardCrowdloans,
    defaultData: [],
    type: fetchMyRewardCrowdloans,
  });

  return {
    crowdloans,
    error,
    isLoading,
  };
};

export const useCrowdloanBalances = (): {
  balances: TBalances;
} => {
  const {
    data: balances,
  }: {
    data: TBalances;
  } = useQuery({
    type: fetchCrowdloanBalances,
    defaultData: {},
  });

  return {
    balances,
  };
};
