import { mainTheme } from '../../themes/mainTheme';
import { polygonTheme } from '../../themes/polygonTheme';
import { moonbeamTheme } from '../../themes/moonbeamTheme';
import { solanaTheme } from '../../themes/solanaTheme';
import { nearTheme } from '../../themes/nearTheme';
import { arbitrumTheme } from '../../themes/arbitrumTheme';
import { iotexTheme } from '../../themes/iotexTheme';
import { avalancheTheme } from '../../themes/avalancheTheme';
import { nervosTheme } from '../../themes/nervosTheme';
import { erigonTheme } from '../../themes/erigonTheme';
import { ChainId } from 'domains/chains/api/chain';
import { harmonyTheme } from 'modules/themes/harmonyTheme';
import { gnosisTheme } from 'modules/themes/gnosisTheme';

export const getTheme = (chainId?: ChainId) => {
  switch (chainId) {
    case ChainId.Moonbeam:
      return moonbeamTheme;

    case ChainId.Polygon:
      return polygonTheme;

    case ChainId.Solana:
      return solanaTheme;

    case ChainId.Near:
      return nearTheme;

    case ChainId.Arbitrum:
      return arbitrumTheme;

    case ChainId.IoTeX:
      return iotexTheme;

    case ChainId.Avalanche:
      return avalancheTheme;

    case ChainId.Nervos:
      return nervosTheme;

    case ChainId.Erigonbsc:
      return erigonTheme;

    case ChainId.Harmony:
      return harmonyTheme;

    case ChainId.Gnosis:
      return gnosisTheme;

    default:
      return mainTheme;
  }
};
