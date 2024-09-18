import { SortChainsParams } from 'domains/chains/components/ChainsList/ChainsListTypes';
import { Tab } from 'modules/common/hooks/useTabs';

import { EChainView } from '../ChainViewSelector';

export interface SortPublicChainsParams extends SortChainsParams {
  isLoading: boolean;
}

export interface IChainsViewProps {
  chainsViewTabs: Tab<EChainView>[];
  selectedChainsViewTab?: Tab<EChainView>;
}
