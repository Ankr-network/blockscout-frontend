import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { getValidSelectedToken } from 'modules/stake-bnb/utils/getValidSelectedToken';

interface IUseSelectedToken {
  selectedToken: TBnbSyntToken;
  handleTokenSelect: (token: TBnbSyntToken) => void;
}

export const useSelectedToken = (): IUseSelectedToken => {
  const { replace } = useHistory();
  const stakeParamsToken = RoutesConfig.stake.useParams().token;
  const selectedToken = featuresConfig.stakeAbnbc
    ? getValidSelectedToken(stakeParamsToken)
    : Token.aBNBb;

  const handleTokenSelect = useCallback(
    (token: TBnbSyntToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
