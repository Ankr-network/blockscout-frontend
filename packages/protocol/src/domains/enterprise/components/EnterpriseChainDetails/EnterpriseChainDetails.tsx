import { t } from '@ankr.com/common';

import { ChainItemHeader } from 'domains/chains/screens/ChainPage/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/types';

import { ChainItemSections } from '../ChainItemSections';
import { useEnterpriseChainDetails } from './useEnterpriseChainDetails';
import { useEnterpriseChainItemBreadcrumbs } from '../../screens/EnterpriseChainItemPage/useEnterpriseChainItemBreadcrumbs';

export interface ChainItemProps {
  data: IPrivateChainItemDetails;
  apiKeys: EnterpriseClientJWT[];
}

export const EnterpriseChainDetails = ({ apiKeys, data }: ChainItemProps) => {
  const {
    chain,
    chainProtocolContext,
    chainSubType,
    chainType,
    group,
    headerContent,
    name,
    unfilteredGroup,
  } = useEnterpriseChainDetails({ ...data, onBlockedTabClick: () => {} });

  useEnterpriseChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader headerContent={headerContent} />
      <ChainItemSections
        chainType={chainType}
        chainSubType={chainSubType}
        chain={data.chain}
        group={group}
        unfilteredGroup={unfilteredGroup}
        apiKeys={apiKeys}
      />
    </ChainProtocolContext.Provider>
  );
};
