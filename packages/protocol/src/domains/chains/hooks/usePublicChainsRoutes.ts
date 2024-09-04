import { useAppSelector } from 'store/useAppSelector';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';

export const usePublicChainsRoutes = () => {
  const chains = useAppSelector(selectPublicBlockchains);

  return chains.map(item => item?.id);
};
