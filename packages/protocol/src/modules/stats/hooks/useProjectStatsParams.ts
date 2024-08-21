import { useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectStatsParams = (token?: string) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const statsParams = useMemo(
    () => {
      if (!token) {
        return undefined;
      }

      return { group, token };
    },
    // token is changing on group change, so group param is removed to avoid
    // double fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  );

  return { statsParams };
};
