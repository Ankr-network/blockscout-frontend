import { mainTheme } from '../../themes/mainTheme';
import { polygonTheme } from '../../themes/polygonTheme';
import { moonbeamTheme } from '../../themes/moonbeamTheme';
import { solanaTheme } from '../../themes/solanaTheme';
import { nearTheme } from '../../themes/nearTheme';
import { arbitrumTheme } from '../../themes/arbitrumTheme';
import { iotexTheme } from '../../themes/iotexTheme';
import { avalancheTheme } from '../../themes/avalancheTheme';
import { nervosTheme } from '../../themes/nervosTheme';
import { ChainId } from 'domains/chains/api/chain';
import { harmonyTheme } from 'modules/themes/harmonyTheme';
import { gnosisTheme } from 'modules/themes/gnosisTheme';
import { syscoinTheme } from 'modules/themes/syscoinTheme';
import { ethTheme } from 'modules/themes/ethTheme';
import { klaytnTheme } from 'modules/themes/klaytnTheme';

export const getTheme = (chainId?: ChainId) => {
  switch (chainId) {
    case ChainId.Ethereum:
      return ethTheme;

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

    case ChainId.Harmony:
      return harmonyTheme;

    case ChainId.Gnosis:
      return gnosisTheme;

    case ChainId.Syscoin:
      return syscoinTheme;

    case ChainId.Klaytn:
      return klaytnTheme;

    default:
      return mainTheme;
  }
};
