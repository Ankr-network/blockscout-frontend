import { useCallback, useEffect, useState } from 'react';

import { BeaconContextValue } from '../constants/BeaconContext';
import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { getBeaconGroup } from '../utils/getBeaconGroup';
import { isBeacon } from 'modules/chains/utils/isBeacon';

export interface BeaconParams {
  group: EndpointGroup;
  netId?: ChainID;
}

export const useBeacon = ({
  group,
  netId,
}: BeaconParams): BeaconContextValue => {
  const [hasBeacon, setHasBeacon] = useState(isBeacon(netId));

  const toggleBeacon = useCallback(() => setHasBeacon(value => !value), []);

  const beaconGroup = getBeaconGroup(group);

  useEffect(() => {
    if (hasBeacon && !beaconGroup) {
      toggleBeacon();
    }
  }, [beaconGroup, toggleBeacon, hasBeacon]);

  return { beaconGroup, hasBeacon, toggleBeacon };
};
