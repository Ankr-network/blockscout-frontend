import { useAuth } from 'domains/auth/hooks/useAuth';
import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { ConnectionSnippet } from './components/ConnectionSnippet';
import { RequestComposer } from 'domains/requestComposer/components/composers';
import { UpgradeBanner } from './components/UpgradeBanner/UpgradeBanner';
import { useGetStartedSectionStyles } from './GetStartedSectionStyles';

export interface GetStartedSectionProps {
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
  chainId: string;
}

export const GetStartedSection = ({
  group,
  unfilteredGroup,
  chainId,
}: GetStartedSectionProps) => {
  const { hasPrivateAccess, loading } = useAuth();
  const isUpgraded = hasPrivateAccess || loading;
  const classes = useGetStartedSectionStyles();
  const publicUrl = unfilteredGroup?.urls[0]?.rpc;

  return (
    <div className={classes.getStartedSection}>
      {!isUpgraded && <UpgradeBanner />}
      {isGroupEvmBased(group) && <ConnectionSnippet group={group} />}
      <RequestComposer
        group={group}
        publicUrl={publicUrl}
        chainId={chainId}
        className={classes.requestComposer}
      />
    </div>
  );
};
