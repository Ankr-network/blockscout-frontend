import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import {
  BaseChainsCard,
  IBaseChainCardProps,
} from 'domains/chains/screens/ChainsListPage/components/BaseChainsCard';
import { IChainCardProps } from 'domains/chains/screens/ChainsListPage/components/PublicChains/components/PublicChainCard';
import { useChainItemClickHandler } from 'modules/common/hooks/useChainItemClickHandler';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';

import { useEnterpriseChainsItem } from './hooks/useEnterpriseChainsItem';

interface EnterpriseChainCardProps
  extends Omit<IChainCardProps, 'onOpenUpgradeModal'> {
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

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    totalRequests: totalRequestsStr,
    ...props,
  };

  const enterpriseChainDetailsPath =
    EnterpriseRoutesConfig.chainDetails.generatePath(chain.id);
  const onCardClick = useChainItemClickHandler(enterpriseChainDetailsPath);

  return <BaseChainsCard {...cardProps} onClick={onCardClick} />;
};
