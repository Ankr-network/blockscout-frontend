import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { chainGroups } from '../constants/groups';
import { GroupedEndpoints } from '../types';
import { getGroupedEndpoints } from '../utils/getGroupedEndpoints';

export const useGroupedEndpoints = (chain: IApiChain): GroupedEndpoints =>
  useMemo(() => getGroupedEndpoints({ chain, groups: chainGroups }), [chain]);
