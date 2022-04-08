import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

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

const FROM_TOKENS = {
  [Token.aETHb]: Token.aETHb,
};

const TO_TOKENS = {
  [Token.aETHc]: Token.aETHc,
};

type FromKey = keyof typeof FROM_TOKENS;

type ToKey = keyof typeof TO_TOKENS;

export const useSwitcherUrlParams = (): IUseSwitcherUrlParamsData => {
  const history = useHistory();

  const query = useQueryParams();
  const queryFrom = query.get(UrlParams.FROM);
  const queryTo = query.get(UrlParams.TO);

  const defaultFrom =
    FROM_TOKENS[queryFrom as FromKey] ||
    TO_TOKENS[queryFrom as ToKey] ||
    Token.aETHb;

  const defaultTo =
    TO_TOKENS[queryTo as ToKey] ||
    FROM_TOKENS[queryTo as FromKey] ||
    Token.aETHc;

  const [from, setFrom] = useState<Token>(defaultFrom);
  const [to, setTo] = useState<Token>(defaultTo);

  const onChangeFrom = useCallback(
    (value: string) => {
      const newFrom =
        FROM_TOKENS[value as FromKey] ||
        TO_TOKENS[value as ToKey] ||
        Token.aETHb;

      setFrom(newFrom);
    },
    [setFrom],
  );

  const onChangeTo = useCallback(
    (value: string) => {
      const newTo =
        TO_TOKENS[value as ToKey] ||
        FROM_TOKENS[value as FromKey] ||
        Token.aETHc;

      setTo(newTo);
    },
    [setTo],
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
