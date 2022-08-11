import { ConnectionSnippet } from './components/ConnectionSnippet';
import { EndpointGroup } from 'modules/endpoints/types';
import { Endpoints } from './components/Endpoints';
import { IApiChain } from 'domains/chains/api/queryChains';
import { UpgradeBanner } from './components/UpgradeBanner/UpgradeBanner';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from './GetStartedContentStyles';

export interface GetStartedContentProps {
  chain: IApiChain;
  group: EndpointGroup;
}

export const GetStartedContent = ({ chain, group }: GetStartedContentProps) => {
  const { credentials, loading } = useAuth();
  const isUpgraded = credentials || loading;
  const classes = useStyles();

  return (
    <div className={classes.getStartedContent}>
      <Endpoints chain={chain} group={group} />
      {!isUpgraded && <UpgradeBanner />}
      {isGroupEvmBased(group) && <ConnectionSnippet group={group} />}
    </div>
  );
};
