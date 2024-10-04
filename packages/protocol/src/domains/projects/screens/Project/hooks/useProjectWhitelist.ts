import { IUseQueryProps } from 'store/queries/types';
import { useFetchProjectWhitelist } from 'domains/projects/hooks/useFetchProjectWhitelist';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface IUseProjectWhitelistProps extends IUseQueryProps {}

export const useProjectWhitelist = ({
  skipFetching = false,
}: IUseProjectWhitelistProps = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  // We need to assert non null type to fit selector interface
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userEndpointToken = project?.userEndpointToken!;

  const { isLoading, projectWhitelist } = useFetchProjectWhitelist({
    skipFetching: skipFetching || !userEndpointToken,
    group,
    userEndpointToken,
  });

  return { isLoading, projectWhitelist };
};
