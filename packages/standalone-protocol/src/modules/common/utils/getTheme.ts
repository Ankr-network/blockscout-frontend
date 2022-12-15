import { ChainId } from 'domains/chains/api/chain';
import { ethTheme } from 'modules/themes/ethTheme';
import { gnosisTheme } from 'modules/themes/gnosisTheme';
import { harmonyTheme } from 'modules/themes/harmonyTheme';
import { iotexTheme } from 'modules/themes/iotexTheme';
import { klaytnTheme } from 'modules/themes/klaytnTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';
import { secretTheme } from 'modules/themes/secretTheme';
import { syscoinTheme } from 'modules/themes/syscoinTheme';
import { arbitrumTheme } from '../../themes/arbitrumTheme';
import { avalancheTheme } from '../../themes/avalancheTheme';
import { mainTheme } from '../../themes/mainTheme';
import { moonbeamTheme } from '../../themes/moonbeamTheme';
import { nearTheme } from '../../themes/nearTheme';
import { nervosTheme } from '../../themes/nervosTheme';
import { filecoinTheme } from '../../themes/filecoinTheme';

export const getTheme = (chainId?: ChainId) => {
  switch (chainId) {
    case ChainId.Ethereum:
      return ethTheme;

    case ChainId.Moonbeam:
      return moonbeamTheme;

    case ChainId.Polygon:
      return polygonTheme;

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

    case ChainId.Secret:
      return secretTheme;

    case ChainId.Filecoin:
      return filecoinTheme;

    case ChainId.Klaytn:
      return klaytnTheme;

    default:
      return mainTheme;
  }
};
