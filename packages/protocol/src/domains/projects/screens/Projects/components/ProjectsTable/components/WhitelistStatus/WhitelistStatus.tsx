import { WhitelistItem } from 'multirpc-sdk';

import { useProjectWhitelist } from 'domains/projects/hooks/useProjectWhitelist';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { WhitelistStatusLabel } from '../WhitelistStatusLabel/WhitelistStatusLabel';

export interface IWhitelistStatusProps {
  userEndpointToken: string;
}

const defaultWhitelist: WhitelistItem[] = [];

export const WhitelistStatus = ({
  userEndpointToken,
}: IWhitelistStatusProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { loading, projectWhitelist } = useProjectWhitelist({
    group,
    userEndpointToken,
  });

  return (
    <WhitelistStatusLabel
      isLoading={loading}
      whitelist={projectWhitelist?.lists ?? defaultWhitelist}
    />
  );
};
