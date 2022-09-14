import { useAuth } from 'domains/auth/hooks/useAuth';
import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { ConnectionSnippet } from './components/ConnectionSnippet';
import { RequestComposer } from './components/RequestComposer';
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
  const { credentials, loading } = useAuth();
  const isUpgraded = credentials || loading;
  const classes = useGetStartedSectionStyles();

  return (
    <div className={classes.getStartedSection}>
      {!isUpgraded && <UpgradeBanner />}
      {isGroupEvmBased(group) && <ConnectionSnippet group={group} />}
      <RequestComposer
        group={group}
        unfilteredGroup={unfilteredGroup}
        chainId={chainId}
        className={classes.requestComposer}
      />
    </div>
  );
};
