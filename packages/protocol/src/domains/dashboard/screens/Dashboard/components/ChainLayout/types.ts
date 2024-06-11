import { ChainID } from 'modules/chains/types';

import { ILayoutProps } from '../../types';

export interface ChainLayoutProps extends ILayoutProps {
  statsChainId: ChainID;
  detailsChainId: ChainID;
}
