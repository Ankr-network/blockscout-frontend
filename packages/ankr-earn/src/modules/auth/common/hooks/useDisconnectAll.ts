import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';

import { useDisconnectMutation } from '../actions/disconnect';

const PROVIDERS_ARRAY = (
  Object.values(AvailableWriteProviders) as AvailableStakingWriteProviders[]
).concat(
  Object.values(ExtraWriteProviders) as AvailableStakingWriteProviders[],
);

type TDisconnectAll = () => void;

export const useDisconnectAll = (): TDisconnectAll => {
  const [disconnect] = useDisconnectMutation();

  return useCallback(() => {
    PROVIDERS_ARRAY.forEach(x => disconnect(x));
  }, [disconnect]);
};
