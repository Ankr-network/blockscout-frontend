import { useEffect } from 'react';

import { useLazyFetchWhitelistBlockchainsQuery } from 'domains/projects/actions/fetchWhitelistBlockchains';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useWhitelistBlockchains = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  const token = project?.userEndpointToken;

  const [fetch, { data: blockchains = [], isLoading }] =
    useLazyFetchWhitelistBlockchainsQuery();

  useEffect(() => {
    if (token) {
      const { unsubscribe } = fetch({ token, group });

      return unsubscribe;
    }

    return () => {};
    // we don't need to refetch data as soon as group changed, so this param is excluded from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch, token]);

  return { blockchains, isLoading };
};
