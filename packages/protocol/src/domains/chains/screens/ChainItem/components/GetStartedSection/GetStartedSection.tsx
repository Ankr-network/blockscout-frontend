import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { ChainID } from 'modules/chains/types';
import { ConnectionSnippet } from './components/ConnectionSnippet';
import { RequestComposer } from 'domains/requestComposer/components/composers';
import { UpgradeBanner } from './components/UpgradeBanner';
import { MultiChainBenefits } from './components/MultichainBenefits';
import { useGetStartedSectionStyles } from './GetStartedSectionStyles';
import { removeWsUrlIfUserIsNotPremium } from './GetStartedSectionUtils';

export interface GetStartedSectionProps {
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
  chainId: string;
  hasPremium: boolean;
  isUpgraded: boolean;
}

export const GetStartedSection = ({
  group,
  unfilteredGroup,
  chainId,
  hasPremium,
  isUpgraded,
}: GetStartedSectionProps) => {
  const isMultiChain = chainId === ChainID.MULTICHAIN;
  const { classes } = useGetStartedSectionStyles();
  const publicUrl = unfilteredGroup?.urls[0]?.rpc;

  const isEvmBased = useMemo(() => isGroupEvmBased(group), [group]);
  const codeSnippetGroup = useMemo(
    () => removeWsUrlIfUserIsNotPremium(group, hasPremium),
    [group, hasPremium],
  );

  return (
    <div className={classes.getStartedSection}>
      {isMultiChain && <MultiChainBenefits />}
      {!isUpgraded && !isMultiChain && <UpgradeBanner />}

      {isEvmBased && <ConnectionSnippet group={codeSnippetGroup} />}
      <RequestComposer
        group={group}
        publicUrl={publicUrl}
        chainId={chainId}
        className={classes.requestComposer}
      />
    </div>
  );
};
