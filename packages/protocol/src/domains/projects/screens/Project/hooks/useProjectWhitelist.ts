import { useEffect } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { fetchProjectWhitelist } from 'domains/projects/actions/fetchProjectWhitelist';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectWhitelist = (skipFetching?: boolean) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  const [fetchWhitelist, { data, isLoading }] = useQueryEndpoint(
    fetchProjectWhitelist,
  );

  const userEndpointToken = project?.userEndpointToken;

  useEffect(() => {
    if (userEndpointToken && !skipFetching) {
      fetchWhitelist({ group, userEndpointToken });
    }
    // we don't need to refetch data as soon as group changed, so this param is excluded from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWhitelist, userEndpointToken, skipFetching]);

  return {
    data,
    isLoading,
  };
};
