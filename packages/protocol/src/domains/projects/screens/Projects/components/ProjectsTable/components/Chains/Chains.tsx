import { Skeleton } from '@mui/material';

import { useProjectWhitelistBlockchains } from 'domains/projects/hooks/useProjectWhitelistBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { AllBlockchainsIcons } from '../../../AllBlockchainsIcons';
import { BlockchainIcon } from '../../../BlockchainIcon';

export interface IChainsProps {
  userEndpointToken: string;
}

export const Chains = ({ userEndpointToken: token }: IChainsProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { loading, projectWhitelistBlockchains } =
    useProjectWhitelistBlockchains({ group, token });

  if (loading) {
    return <Skeleton width={32} height={32} variant="circular" />;
  }

  if (projectWhitelistBlockchains.length === 0) {
    return <AllBlockchainsIcons />;
  }

  return (
    <BlockchainIcon
      blockchains={projectWhitelistBlockchains}
      isPaddingLeftIgnored
    />
  );
};
