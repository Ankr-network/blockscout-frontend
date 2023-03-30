import { ChangeEvent, useCallback, useState } from 'react';

import { Token } from 'modules/common/types/token';

interface IUseHistoryTokenSelectData {
  selectedToken: Token;
  onTokenSelectChange: (e: ChangeEvent<{ value: unknown }>) => void;
}

export const useHistoryTokenSelect = (
  defaultSelectedToken: Token,
): IUseHistoryTokenSelectData => {
  const [selectedToken, setSelectedToken] = useState(defaultSelectedToken);

  const onTokenSelectChange = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      setSelectedToken(e.target.value as Token);
    },
    [],
  );

  return {
    selectedToken,
    onTokenSelectChange,
  };
};
