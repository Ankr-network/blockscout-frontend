import { ChainID } from '@ankr.com/chains-list';

import { ILayoutProps } from '../../types';

export interface ChainLayoutProps extends ILayoutProps {
  statsChainId: ChainID;
  detailsChainId: ChainID;
}
