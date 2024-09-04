import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/types';
import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { EnterpriseClientJwtManagerItem } from 'domains/enterprise/store/selectors';

import { useEnterpriseChainDetails } from './useEnterpriseChainDetails';
import { ChainItemSections } from '../ChainItemSections';
import { useEnterpriseChainItemBreadcrumbs } from '../../screens/EnterpriseChainItemPage/useEnterpriseChainItemBreadcrumbs';

export interface ChainItemProps {
  data: IPrivateChainItemDetails;
  apiKeys: EnterpriseClientJwtManagerItem[];
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
