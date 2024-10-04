import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { getWhitelistCounts } from '../utils/getWhitelistCounts';
import { useProjectWhitelist } from './useProjectWhitelist';

const defaultWhitelist: WhitelistItem[] = [];

export const useWhitelistCounts = () => {
  const { isLoading, projectWhitelist } = useProjectWhitelist({
    skipFetching: true,
  });

  const whitelist = projectWhitelist?.lists || defaultWhitelist;

  const whitelistsCounts = useMemo(
    () => getWhitelistCounts(whitelist),
    [whitelist],
  );

  return { ...whitelistsCounts, isLoading, whitelist };
};
