import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback } from 'react';

import { getAlreadyExistInWhitelistError } from 'domains/projects/utils/getAlreadyExistInWhitelistError';
import { selectProjectWhitelistByType } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';

export const useValueExistValidator = (type: UserEndpointTokenMode) => {
  const whitelist = useAppSelector(state =>
    selectProjectWhitelistByType(state, type),
  );

  return useCallback(
    (value = '') => {
      const hasValue = whitelist.some(({ list }) =>
        list.map(item => item.toLowerCase()).includes(value.toLowerCase()),
      );

      return hasValue ? getAlreadyExistInWhitelistError(type) : undefined;
    },
    [type, whitelist],
  );
};
