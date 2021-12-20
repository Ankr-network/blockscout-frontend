import { alpha, lighten } from '@material-ui/core';
import { BlockchainNetworkId } from 'modules/common/types';
import { mainTheme } from 'modules/themes/mainTheme';
import { ThemeColors } from 'web3modal';
import { AvailableProviders } from './types';

export const web3ModalTheme: ThemeColors = {
  background: mainTheme.palette.background.paper,
  main: mainTheme.palette.text.primary,
  secondary: alpha(mainTheme.palette.text.primary, 0.5),
  border: mainTheme.palette.background.default,
  hover: lighten(mainTheme.palette.background.default, 0.2),
};

export const availableProvidersMap = {
  [AvailableProviders.Mainnet]: BlockchainNetworkId.mainnet,
  [AvailableProviders.Polygon]: BlockchainNetworkId.polygon,
  [AvailableProviders.Goerli]: BlockchainNetworkId.goerli,
};
