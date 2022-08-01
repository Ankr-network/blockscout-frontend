import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { MGNO_STAKING_NETWORKS } from 'modules/stake-mgno/const';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { IUseStakableToken } from '../types';

export const useStakableMGNO = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        MGNO_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  return {
    icon: <MGNOIcon />,
    token: Token.mGNO,
    href: '',
    apy: 0,
    balance: ZERO,
    networks: networksData,
    isLoading: false,
    isStakeLoading: false,
    isShowed: false,
  };
};
