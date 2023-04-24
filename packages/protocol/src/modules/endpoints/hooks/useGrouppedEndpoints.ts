import { useMemo } from 'react';

import { Chain } from 'domains/chains/types';
import { chainGroups } from '../constants/groups';
import { GroupedEndpoints } from '../types';
import { getGroupedEndpoints } from '../utils/getGroupedEndpoints';

export const useGroupedEndpoints = (chain: Chain): GroupedEndpoints =>
  useMemo(() => getGroupedEndpoints({ chain, groups: chainGroups }), [chain]);
