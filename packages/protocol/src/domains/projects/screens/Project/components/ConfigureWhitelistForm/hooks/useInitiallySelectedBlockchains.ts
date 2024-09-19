import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

export interface UseInitiallySelectedBlockchainsParams {
  value: string;
  whitelist: WhitelistItem[];
}

export const useInitiallySelectedBlockchains = ({
  value,
  whitelist,
}: UseInitiallySelectedBlockchainsParams) =>
  useMemo(
    () =>
      whitelist
        .filter(({ list }) => list.includes(value))
        .map<ChainPath>(({ blockchain }) => blockchain),
    [value, whitelist],
  );
