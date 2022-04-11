import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders, BlockchainNetworkId } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetworks,
} from 'modules/switcher/const';

export interface IUseSwitcherUrlParamsData {
  from: AvailableSwitcherToken;
  to: AvailableSwitcherToken;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
}

enum UrlParams {
  FROM = 'from',
  TO = 'to',
}

const DEFAULT_TOKENS_BY_NETWORK: Record<
  AvailableSwitchNetworks,
  { from: AvailableSwitcherToken; to: AvailableSwitcherToken }
> = {
  [BlockchainNetworkId.goerli]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.mainnet]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.smartchain]: { from: Token.aBNBb, to: Token.aBNBc },
  [BlockchainNetworkId.smartchainTestnet]: {
    from: Token.aBNBb,
    to: Token.aBNBc,
  },
};

type FromKey = keyof typeof TOKENS_MAP['from'];

type ToKey = keyof typeof TOKENS_MAP['to'];

const TOKENS_MAP: Record<UrlParams, Record<string, string>> = {
  [UrlParams.FROM]: {
    [Token.aETHb]: Token.aETHb,
    ...(featuresConfig.switcherBnb ? { [Token.aBNBb]: Token.aBNBb } : {}),
  },

  [UrlParams.TO]: {
    [Token.aETHc]: Token.aETHc,
    ...(featuresConfig.switcherBnb ? { [Token.aBNBc]: Token.aBNBc } : {}),
  },
};

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const history = useHistory();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const query = useQueryParams();
  const queryFrom = query.get(UrlParams.FROM);
  const queryTo = query.get(UrlParams.TO);
  const defaultTokens =
    DEFAULT_TOKENS_BY_NETWORK[chainId as AvailableSwitchNetworks];

  const defaultFrom =
    TOKENS_MAP.from[queryFrom as FromKey] ||
    TOKENS_MAP.to[queryFrom as ToKey] ||
    defaultTokens.from;

  const defaultTo =
    TOKENS_MAP.to[queryTo as ToKey] ||
    TOKENS_MAP.from[queryTo as FromKey] ||
    defaultTokens.to;

  const [from, setFrom] = useState<AvailableSwitcherToken>(
    defaultFrom as AvailableSwitcherToken,
  );
  const [to, setTo] = useState<AvailableSwitcherToken>(
    defaultTo as AvailableSwitcherToken,
  );

  const onChangeFrom = useCallback(
    (value: string) => {
      const newFrom =
        TOKENS_MAP.from[value as FromKey] ||
        TOKENS_MAP.to[value as ToKey] ||
        defaultTokens.from;

      setFrom(newFrom as AvailableSwitcherToken);
    },
    [defaultTokens, setFrom],
  );

  const onChangeTo = useCallback(
    (value: string) => {
      const newTo =
        TOKENS_MAP.to[value as ToKey] ||
        TOKENS_MAP.from[value as FromKey] ||
        defaultTokens.to;

      setTo(newTo as AvailableSwitcherToken);
    },
    [defaultTokens, setTo],
  );

  useEffect(() => {
    query.set(UrlParams.FROM, from);
    query.set(UrlParams.TO, to);

    history.replace({ search: query.toString() });
  }, [query, history, from, to]);

  return {
    from,
    to,
    onChangeFrom,
    onChangeTo,
  };
};
