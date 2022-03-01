import { mainTheme } from '../../themes/mainTheme';
import { polygonTheme } from '../../themes/polygonTheme';
import { solanaTheme } from '../../themes/solanaTheme';
import { nearTheme } from '../../themes/nearTheme';
import { arbitrumTheme } from '../../themes/arbitrumTheme';
import { iotexTheme } from '../../themes/iotexTheme';
import { avalancheTheme } from '../../themes/avalancheTheme';
import { nervosTheme } from '../../themes/nervosTheme';
import { erigonTheme } from '../../themes/erigonTheme';

export const getTheme = (chainId?: string) => {
  switch (chainId) {
    case 'polygon':
      return polygonTheme;

    case 'solana':
      return solanaTheme;

    case 'near':
      return nearTheme;

    case 'arbitrum':
      return arbitrumTheme;

    case 'iotex':
      return iotexTheme;

    case 'avalanche':
      return avalancheTheme;

    case 'nervos':
      return nervosTheme;

    case 'erigonbsc':
      return erigonTheme;

    default:
      return mainTheme;
  }
};
