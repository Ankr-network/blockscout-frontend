import { useMemo } from 'react';

import { selectPublicBlockchains } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const usePublicChainsRoutes = () => {
  const chains = useAppSelector(selectPublicBlockchains);

  return useMemo(() => chains.map(({ id }) => id), [chains]);
};
