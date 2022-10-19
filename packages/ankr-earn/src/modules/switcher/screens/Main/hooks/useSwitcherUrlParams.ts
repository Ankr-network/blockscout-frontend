import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SwitcherUrlParams,
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

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const history = useHistory();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const query = useQueryParams();
  const queryFrom = query.get(SwitcherUrlParams.FROM);
  const queryTo = query.get(SwitcherUrlParams.TO);
  const defaultTokens =
    DEFAULT_TOKENS_BY_NETWORK[chainId as AvailableSwitchNetwork];

  const defaultFrom =
    SWITCHER_TOKENS_MAP.from[queryFrom as SwitcherFromKey] ||
    SWITCHER_TOKENS_MAP.to[queryFrom as SwitcherToKey] ||
    defaultTokens.from;

  const defaultTo =
    SWITCHER_TOKENS_MAP.to[queryTo as SwitcherToKey] ||
    SWITCHER_TOKENS_MAP.from[queryTo as SwitcherFromKey] ||
    defaultTokens.to;

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

  useEffect(() => {
    query.set(SwitcherUrlParams.FROM, from);
    query.set(SwitcherUrlParams.TO, to);

    history.replace({ search: query.toString() });
  }, [query, history, from, to]);

  return {
    from,
    to,
    onChangeFrom,
    onChangeTo,
  };
};
