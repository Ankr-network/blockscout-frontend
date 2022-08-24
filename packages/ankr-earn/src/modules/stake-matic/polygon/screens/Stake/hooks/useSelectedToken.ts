import { useCallback } from 'react';

import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getValidSelectedToken } from 'modules/stake-matic/common/utils/getValidSelectedToken';
import { RoutesConfig } from 'modules/stake-matic/polygon/Routes';

interface IUseSelectedTokenData {
  selectedToken: TMaticSyntToken;
  handleTokenSelect: (token: TMaticSyntToken) => void;
}

/**
 * TODO Remove a token hardcode (MATIC on Polygon)
 */
export const useSelectedToken = (): IUseSelectedTokenData => {
  const stakeParamsToken = Token.aMATICc;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const handleTokenSelect = useCallback((token: TMaticSyntToken): void => {
    RoutesConfig.stake.generatePath(token);
  }, []);

  return {
    selectedToken,
    handleTokenSelect,
  };
};
