import { ChainID } from 'modules/chains/types';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';
import { selectIsLightTheme } from 'modules/layout/store/themeSlice';
import { useAppSelector } from 'store/useAppSelector';

export const useChainIcon = (chainId: ChainID) => {
  const isLightTheme = useAppSelector(selectIsLightTheme);

  return getChainIcon(chainId, isLightTheme);
};
