import { useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { chainGroups } from '../constants/groups';
import { GroupedEndpoints } from '../types';
import { getGroupedEndpoints } from '../utils/getGroupedEndpoints';

export const useGroupedEndpoints = (
  chain: Chain,
  shouldExpandFlareTestnets = false,
): GroupedEndpoints =>
  useMemo(
    () =>
      getGroupedEndpoints({
        chain,
        groups: chainGroups,
        shouldExpandFlareTestnets,
      }),
    [chain, shouldExpandFlareTestnets],
  );
