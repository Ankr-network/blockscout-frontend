import { t } from '@ankr.com/common';

import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';

import { useEnterpriseChainDetails } from './useEnterpriseChainDetails';
import { ChainItemSections } from '../ChainItemSections';
import { EnterpriseClientJwtManagerItem } from '../../store/selectors';
import { useEnterpriseChainItemBreadcrumbs } from '../../screens/ChainItem/useEnterpriseChainItemBreadcrumbs';

export interface ChainItemProps {
  data: IPrivateChainItemDetails;
  apiKeys: EnterpriseClientJwtManagerItem[];
}

export const EnterpriseChainDetails = ({ data, apiKeys }: ChainItemProps) => {
  const {
    chainProtocolContext,
    chain,
    chainType,
    group,
    chainSubType,
    unfilteredGroup,
    name,
    headerContent,
  } = useEnterpriseChainDetails({ ...data, onBlockedTabClick: () => {} });

  useEnterpriseChainItemBreadcrumbs(chain.name);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader chain={chain} headerContent={headerContent} />
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
