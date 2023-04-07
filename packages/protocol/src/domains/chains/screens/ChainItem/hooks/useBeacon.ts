import { useCallback, useEffect, useState } from 'react';

import { BeaconContextValue } from '../constants/BeaconContext';
import { EndpointGroup } from 'modules/endpoints/types';
import { getBeaconGroup } from '../utils/getBeaconGroup';

export const useBeacon = (group: EndpointGroup): BeaconContextValue => {
  const [hasBeacon, setHasBeacon] = useState(false);

  const toggleBeacon = useCallback(() => setHasBeacon(value => !value), []);

  const beaconGroup = getBeaconGroup(group);

  useEffect(() => {
    if (hasBeacon && !beaconGroup) {
      toggleBeacon();
    }
  }, [beaconGroup, toggleBeacon, hasBeacon]);

  return { beaconGroup, hasBeacon, toggleBeacon };
};
