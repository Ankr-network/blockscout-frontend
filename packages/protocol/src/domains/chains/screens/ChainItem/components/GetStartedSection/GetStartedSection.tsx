import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { ConnectionSnippet } from './components/ConnectionSnippet';
import { Endpoints } from './components/Endpoints';
import { UpgradeBanner } from './components/UpgradeBanner/UpgradeBanner';
import { useGetStartedSectionStyles } from './GetStartedSectionStyles';

export interface GetStartedSectionProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
}

export const GetStartedSection = ({
  chain,
  chainType,
  group,
}: GetStartedSectionProps) => {
  const { credentials, loading } = useAuth();
  const isUpgraded = credentials || loading;
  const classes = useGetStartedSectionStyles();

  return (
    <div className={classes.getStartedSection}>
      <Endpoints chain={chain} chainType={chainType} group={group} />
      {!isUpgraded && <UpgradeBanner />}
      {isGroupEvmBased(group) && <ConnectionSnippet group={group} />}
    </div>
  );
};
