import { GroupedEndpoints } from 'modules/endpoints/types';

import { Network, NetworkName } from '../types';

export const getNetworks = (endpoints: GroupedEndpoints) =>
  Object.entries(endpoints)
    .map<Network>(([name, groups]) => ({
      groups,
      name: name as NetworkName,
    }))
    .filter(network => network.groups.length > 0);
