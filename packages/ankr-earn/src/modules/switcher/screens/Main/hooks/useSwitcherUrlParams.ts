import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { EEthereumNetworkId } from 'modules/common/types';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  DEFAULT_TOKENS_BY_NETWORK,
  SwitcherFromKey,
  SwitcherToKey,
  SWITCHER_TOKENS_MAP,
  SWITCHER_TOKENS_PAIR,
} from 'modules/switcher/const';
import { RoutesConfig } from 'modules/switcher/Routes';
import { getIsTokenValid } from 'modules/switcher/utils/getIsTokenValid';

export interface IUseSwitcherUrlParamsData {
  from: AvailableSwitcherToken;
  to: AvailableSwitcherToken;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
}

const DEFAULT_CHAIN_ID = EEthereumNetworkId.mainnet;

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const { replace } = useHistory();
  const { from: queryFrom } = RoutesConfig.main.useParams();

  const { chainId: baseChainId } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const chainId = baseChainId || DEFAULT_CHAIN_ID;

  const defaultTokens =
    DEFAULT_TOKENS_BY_NETWORK[chainId as AvailableSwitchNetwork] ??
    DEFAULT_TOKENS_BY_NETWORK[ETH_NETWORK_BY_ENV];

  const from = getIsTokenValid(queryFrom ?? undefined)
    ? (queryFrom as AvailableSwitcherToken)
    : defaultTokens.from;

  const [to, setTo] = useState<AvailableSwitcherToken>(
    SWITCHER_TOKENS_PAIR[from],
  );

  const onChangeFrom = useCallback(
    (value: string) => {
      const newFrom =
        SWITCHER_TOKENS_MAP.from[value as SwitcherFromKey] ||
        SWITCHER_TOKENS_MAP.to[value as SwitcherToKey] ||
        defaultTokens.from;

      replace(RoutesConfig.main.generatePath(newFrom));
    },
    [defaultTokens.from, replace],
  );

  const onChangeTo = useCallback(
    (value: string) => {
      const newTo =
        SWITCHER_TOKENS_MAP.to[value as SwitcherToKey] ||
        SWITCHER_TOKENS_MAP.from[value as SwitcherFromKey] ||
        defaultTokens.to;

      setTo(newTo as AvailableSwitcherToken);
    },
    [defaultTokens.to, setTo],
  );

  useInitEffect(() => {
    replace(RoutesConfig.main.generatePath(from));
  });

  return {
    from,
    to,
    onChangeFrom,
    onChangeTo,
  };
};
