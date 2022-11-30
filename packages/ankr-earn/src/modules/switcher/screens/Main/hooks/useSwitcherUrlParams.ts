import { useState, useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { EEthereumNetworkId } from 'modules/common/types';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SwitcherFromKey,
  SwitcherToKey,
  DEFAULT_TOKENS_BY_NETWORK,
  SWITCHER_TOKENS_MAP,
  SWITCHER_TOKENS_PAIR,
} from 'modules/switcher/const';

export interface IUseSwitcherUrlParamsData {
  from: AvailableSwitcherToken;
  to: AvailableSwitcherToken;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
}

const DEFAULT_CHAIN_ID = EEthereumNetworkId.mainnet;

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const { chainId: baseChainId } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const chainId = baseChainId || DEFAULT_CHAIN_ID;

  const defaultTokens =
    DEFAULT_TOKENS_BY_NETWORK[chainId as AvailableSwitchNetwork] ??
    DEFAULT_TOKENS_BY_NETWORK[ETH_NETWORK_BY_ENV];

  const defaultFrom = defaultTokens.from;

  const defaultTo = defaultTokens.to;

  const uniqueDefaultTo =
    defaultTo !== defaultFrom
      ? (defaultTo as AvailableSwitcherToken)
      : SWITCHER_TOKENS_PAIR[defaultTo as AvailableSwitcherToken];

  const [from, setFrom] = useState<AvailableSwitcherToken>(
    defaultFrom as AvailableSwitcherToken,
  );

  const [to, setTo] = useState<AvailableSwitcherToken>(uniqueDefaultTo);

  const onChangeFrom = useCallback(
    (value: string) => {
      const newFrom =
        SWITCHER_TOKENS_MAP.from[value as SwitcherFromKey] ||
        SWITCHER_TOKENS_MAP.to[value as SwitcherToKey] ||
        defaultTokens.from;

      setFrom(newFrom as AvailableSwitcherToken);
    },
    [defaultTokens, setFrom],
  );

  const onChangeTo = useCallback(
    (value: string) => {
      const newTo =
        SWITCHER_TOKENS_MAP.to[value as SwitcherToKey] ||
        SWITCHER_TOKENS_MAP.from[value as SwitcherFromKey] ||
        defaultTokens.to;

      setTo(newTo as AvailableSwitcherToken);
    },
    [defaultTokens, setTo],
  );

  return {
    from,
    to,
    onChangeFrom,
    onChangeTo,
  };
};
