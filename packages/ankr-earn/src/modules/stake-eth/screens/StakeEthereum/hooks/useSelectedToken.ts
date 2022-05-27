import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { TEthToken } from 'modules/api/EthSDK';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { getValidSelectedToken } from 'modules/stake-eth/utils/getValidSelectedToken';

interface IUseSelectedToken {
  selectedToken: TEthToken;
  handleTokenSelect: (token: TEthToken) => void;
}

export const useSelectedToken = (): IUseSelectedToken => {
  const { replace } = useHistory();
  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const handleTokenSelect = useCallback(
    (token: TEthToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
