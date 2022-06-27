import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { RoutesConfig } from 'modules/stake-fantom/Routes';
import { getValidSelectedToken } from 'modules/stake-fantom/utils/getValidSelectedToken';

import { TFtmSyntToken } from '../../../types/TFtmSyntToken';

interface IUseSelectedToken {
  selectedToken: TFtmSyntToken;
  handleTokenSelect: (token: TFtmSyntToken) => void;
}

export const useSelectedToken = (): IUseSelectedToken => {
  const { replace } = useHistory();
  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const handleTokenSelect = useCallback(
    (token: TFtmSyntToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
