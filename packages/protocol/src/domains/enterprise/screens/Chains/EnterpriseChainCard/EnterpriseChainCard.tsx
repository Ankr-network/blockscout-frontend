import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { ComingSoonChainCard } from 'domains/chains/screens/Chains/components/ComingSoonChainCard';
import { PremiumOnlyChainCard } from 'domains/chains/screens/Chains/components/PremiumOnlyChainCard';
import {
  BaseChainsCard,
  IBaseChainCardProps,
} from 'domains/chains/screens/Chains/components/BaseChainsCard';
import { IChainCardProps } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainCard';
import { useChainItemClickHandler } from 'modules/common/hooks/useChainItemClickHandler';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';

import { useEnterpriseChainsItem } from './hooks/useEnterpriseChainsItem';

interface EnterpriseChainCardProps extends IChainCardProps {
  hasPremium: boolean;
  hasTotalRequestsLabel?: boolean;
}

export const EnterpriseChainCard = ({
  chain,
  hasPremium,
  ...props
}: EnterpriseChainCardProps) => {
  const { loading, totalRequests } = useEnterpriseChainsItem({ chain });

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  const { isComingSoon, premiumOnly } = chain;

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    totalRequests: totalRequestsStr,
    ...props,
  };

  const enterpriseChainDetailsPath =
    EnterpriseRoutesConfig.chainDetails.generatePath(chain.id);
  const onCardClick = useChainItemClickHandler(enterpriseChainDetailsPath);

  if (isComingSoon) {
    return <ComingSoonChainCard {...cardProps} onClick={onCardClick} />;
  }

  if (premiumOnly && !hasPremium) {
    return <PremiumOnlyChainCard {...cardProps} onClick={onCardClick} />;
  }

  return <BaseChainsCard {...cardProps} onClick={onCardClick} />;
};
