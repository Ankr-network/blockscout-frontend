import { useContext } from 'react';

import { BeaconContext } from '../constants/BeaconContext';

export const useBeaconContext = () => useContext(BeaconContext);
