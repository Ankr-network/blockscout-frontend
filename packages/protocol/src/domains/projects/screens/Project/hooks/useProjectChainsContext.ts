import { useContext } from 'react';

import { ProjectChainsContext } from '../constants';

export const useProjectChainsContext = () => useContext(ProjectChainsContext);
