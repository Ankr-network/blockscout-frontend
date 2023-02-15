import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';

const path = ChainsRoutesConfig.chains.generatePath();

export const useClickHandler = () => {
  const history = useHistory();

  return useCallback(() => history.push(path), [history]);
};
