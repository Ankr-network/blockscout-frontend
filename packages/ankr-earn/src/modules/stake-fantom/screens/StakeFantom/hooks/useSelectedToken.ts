import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
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
  const selectedToken = featuresConfig.stakeAFTMC
    ? getValidSelectedToken(stakeParamsToken)
    : Token.aFTMb;

  const handleTokenSelect = useCallback(
    (token: TFtmSyntToken) => replace(RoutesConfig.stake.generatePath(token)),
    [replace],
  );

  return {
    selectedToken,
    handleTokenSelect,
  };
};
