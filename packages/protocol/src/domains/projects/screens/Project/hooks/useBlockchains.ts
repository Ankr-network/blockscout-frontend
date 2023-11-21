import { selectBlockchains } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useBlockchains = () => {
  const { data: blockchains = [] } = useAppSelector(selectBlockchains);

  return blockchains;
};
