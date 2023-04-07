import { createContext } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';

export interface BeaconContextValue {
  beaconGroup?: EndpointGroup;
  hasBeacon: boolean;
  toggleBeacon: () => void;
}

export const BeaconContext = createContext<BeaconContextValue>({
  beaconGroup: undefined,
  hasBeacon: false,
  toggleBeacon: () => {},
});
