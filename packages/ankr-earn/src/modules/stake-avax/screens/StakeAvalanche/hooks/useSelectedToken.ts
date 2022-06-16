import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { RoutesConfig } from 'modules/stake-avax/Routes';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { getValidSelectedToken } from 'modules/stake-avax/utils/getValidSelectedToken';

interface IUseSelectedToken {
  selectedToken: TAvaxSyntToken;
  handleTokenSelect: (token: TAvaxSyntToken) => void;
}

export const useSelectedToken = (): IUseSelectedToken => {
  const { replace } = useHistory();
  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const handleTokenSelect = useCallback(
    (token: TAvaxSyntToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
