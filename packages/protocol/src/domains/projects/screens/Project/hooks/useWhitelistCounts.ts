import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { getWhitelistCounts } from '../utils/getWhitelistCounts';
import { useProjectWhitelist } from './useProjectWhitelist';

const defaultWhitelist: WhitelistItem[] = [];

export const useWhitelistCounts = () => {
  const { data, isLoading } = useProjectWhitelist(true);

  const whitelist = data?.lists || defaultWhitelist;

  const whitelistsCounts = useMemo(
    () => getWhitelistCounts(whitelist),
    [whitelist],
  );

  return { ...whitelistsCounts, isLoading, whitelist };
};
