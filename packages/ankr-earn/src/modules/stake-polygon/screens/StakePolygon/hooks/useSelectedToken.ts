import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { RoutesConfig } from 'modules/stake-polygon/Routes';
import { TMaticSyntToken } from 'modules/stake-polygon/types';
import { getValidSelectedToken } from 'modules/stake-polygon/utils/getValidSelectedToken';

interface IUseSelectedToken {
  selectedToken: TMaticSyntToken;
  handleTokenSelect: (token: TMaticSyntToken) => void;
}

export const useSelectedToken = (): IUseSelectedToken => {
  const { replace } = useHistory();
  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const handleTokenSelect = useCallback(
    (token: TMaticSyntToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
