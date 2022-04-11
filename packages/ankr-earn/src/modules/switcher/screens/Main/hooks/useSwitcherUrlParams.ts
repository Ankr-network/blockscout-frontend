import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders, BlockchainNetworkId } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';

export interface IUseSwitcherUrlParamsData {
  from: Token;
  to: Token;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
}

enum UrlParams {
  FROM = 'from',
  TO = 'to',
}

type AvailableNetworks =
  | BlockchainNetworkId.goerli
  | BlockchainNetworkId.mainnet
  | BlockchainNetworkId.smartchain
  | BlockchainNetworkId.smartchainTestnet;

const DEFAULT_TOKENS_BY_NETWORK: Record<
  AvailableNetworks,
  { from: Token; to: Token }
> = {
  [BlockchainNetworkId.goerli]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.mainnet]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.smartchain]: { from: Token.aBNBb, to: Token.aBNBc },
  [BlockchainNetworkId.smartchainTestnet]: {
    from: Token.aBNBb,
    to: Token.aBNBc,
  },
};

const TOKENS_MAP = {
  from: {
    [Token.aETHb]: Token.aETHb,
  },

  to: {
    [Token.aETHc]: Token.aETHc,
  },
};

type FromKey = keyof typeof TOKENS_MAP['from'];

type ToKey = keyof typeof TOKENS_MAP['to'];

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const history = useHistory();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const query = useQueryParams();
  const queryFrom = query.get(UrlParams.FROM);
  const queryTo = query.get(UrlParams.TO);
  const defaultTokens = DEFAULT_TOKENS_BY_NETWORK[chainId as AvailableNetworks];

  const defaultFrom =
    TOKENS_MAP.from[queryFrom as FromKey] ||
    TOKENS_MAP.to[queryFrom as ToKey] ||
    defaultTokens.from;

  const defaultTo =
    TOKENS_MAP.to[queryTo as ToKey] ||
    TOKENS_MAP.from[queryTo as FromKey] ||
    defaultTokens.to;

  const [from, setFrom] = useState<Token>(defaultFrom);
  const [to, setTo] = useState<Token>(defaultTo);

  const onChangeFrom = useCallback(
    (value: string) => {
      const newFrom =
        TOKENS_MAP.from[value as FromKey] ||
        TOKENS_MAP.to[value as ToKey] ||
        defaultTokens.from;

      setFrom(newFrom);
    },
    [defaultTokens, setFrom],
  );

  const onChangeTo = useCallback(
    (value: string) => {
      const newTo =
        TOKENS_MAP.to[value as ToKey] ||
        TOKENS_MAP.from[value as FromKey] ||
        defaultTokens.to;

      setTo(newTo);
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
