import { useAuth } from 'domains/auth/hooks/useAuth';
import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { ConnectionSnippet } from './components/ConnectionSnippet';
import { RequestComposer } from './components/RequestComposer';
import { UpgradeBanner } from './components/UpgradeBanner/UpgradeBanner';
import { useGetStartedSectionStyles } from './GetStartedSectionStyles';

export interface GetStartedSectionProps {
  group: EndpointGroup;
  publicUrl: string;
}

export const GetStartedSection = ({
  group,
  publicUrl,
}: GetStartedSectionProps) => {
  const { credentials, loading } = useAuth();
  const isUpgraded = credentials || loading;
  const classes = useGetStartedSectionStyles();

  return (
    <div className={classes.getStartedSection}>
      {!isUpgraded && <UpgradeBanner />}
      {isGroupEvmBased(group) && (
        <>
          <ConnectionSnippet group={group} />
          <div className={classes.requestComposer}>
            <RequestComposer group={group} publicUrl={publicUrl} />
          </div>
        </>
      )}
    </div>
  );
};
