import { ChainId } from 'domains/chains/api/chain';
import { ethTheme } from 'modules/themes/ethTheme';
import { gnosisTheme } from 'modules/themes/gnosisTheme';
import { harmonyTheme } from 'modules/themes/harmonyTheme';
import { horizenTheme } from 'modules/themes/horizenTheme';
import { iotexTheme } from 'modules/themes/iotexTheme';
import { klaytnTheme } from 'modules/themes/klaytnTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';
import { secretTheme } from 'modules/themes/secretTheme';
import { syscoinTheme } from 'modules/themes/syscoinTheme';
import { arbitrumTheme } from 'modules/themes/arbitrumTheme';
import { avalancheTheme } from 'modules/themes/avalancheTheme';
import { chilizTheme } from 'modules/themes/chilizTheme';
import { moonbeamTheme } from 'modules/themes/moonbeamTheme';
import { nearTheme } from 'modules/themes/nearTheme';
import { nervosTheme } from 'modules/themes/nervosTheme';
import { filecoinTheme } from 'modules/themes/filecoinTheme';
import { fantomTheme } from 'modules/themes/fantomTheme';
import { bscTheme } from 'modules/themes/bscTheme';
import { polygonZkevmTheme } from 'modules/themes/polygonZkevmTheme';
import { tenetTheme } from 'modules/themes/tenetTheme';
import { zksyncEraTheme } from 'modules/themes/zksyncEraTheme';
import { rolluxTheme } from 'modules/themes/rolluxTheme';
import { mantleTheme } from 'modules/themes/mantleTheme';
import { flareTheme } from 'modules/themes/flareTheme';

export const getTheme = (chainId?: ChainId) => {
  switch (chainId) {
    case ChainId.Ethereum:
      return ethTheme;

    case ChainId.Moonbeam:
      return moonbeamTheme;

    case ChainId.Polygon:
      return polygonTheme;

    case ChainId.POLYGON_ZKEVM:
      return polygonZkevmTheme;

    case ChainId.Near:
      return nearTheme;

    case ChainId.Arbitrum:
      return arbitrumTheme;

    case ChainId.IoTeX:
      return iotexTheme;

    case ChainId.Avalanche:
      return avalancheTheme;

    case ChainId.Chiliz:
      return chilizTheme;

    case ChainId.Nervos:
      return nervosTheme;

    case ChainId.Harmony:
      return harmonyTheme;

    case ChainId.HORIZEN_EON:
      return horizenTheme;

    case ChainId.Gnosis:
      return gnosisTheme;

    case ChainId.Fantom:
      return fantomTheme;

    case ChainId.Syscoin:
      return syscoinTheme;

    case ChainId.Secret:
      return secretTheme;

    case ChainId.Filecoin:
      return filecoinTheme;

    case ChainId.Flare:
      return flareTheme;

    case ChainId.Klaytn:
      return klaytnTheme;

    case ChainId.BSC:
      return bscTheme;

    case ChainId.Tenet:
      return tenetTheme;

    case ChainId.ZksyncEra:
      return zksyncEraTheme;

    case ChainId.Rollux:
      return rolluxTheme;

    case ChainId.Mantle:
      return mantleTheme;

    default:
      return flareTheme;
  }
};
