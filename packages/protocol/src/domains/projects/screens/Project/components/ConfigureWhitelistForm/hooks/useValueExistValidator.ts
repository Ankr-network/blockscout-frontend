import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback } from 'react';

import { getAlreadyExistInWhitelistError } from 'domains/projects/utils/getAlreadyExistInWhitelistError';
import { selectProjectWhitelistByType } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useValueExistValidator = (type: UserEndpointTokenMode) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  // We need to assert non null type to fit selector interface
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userEndpointToken = project?.userEndpointToken!;

  const whitelist = useAppSelector(state =>
    selectProjectWhitelistByType(state, { group, type, userEndpointToken }),
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
