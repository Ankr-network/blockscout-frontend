import { ChainID } from 'modules/chains/types';

import aptosIcon from './icons/aptos.svg';
import arbitrumIcon from './icons/arbitrum.svg';
import arbitrumNovaIcon from './icons/arbitrum-nova.svg';
import avaxIcon from './icons/avax.svg';
import bscIcon from './icons/bsc.svg';
import bttcIcon from './icons/bttc.svg';
import btcIcon from './icons/btc.svg';
import celoIcon from './icons/celo.svg';
import chilizIcon from './icons/chiliz.svg';
import coreIcon from './icons/core.svg';
import defaultIcon from './icons/default-icon.svg';
import ethIcon from './icons/eth.svg';
import filecoinIcon from './icons/filecoin.svg';
import flareIcon from './icons/flare.svg';
import ftmIcon from './icons/ftm.svg';
import gnosisIcon from './icons/gnosis.svg';
import harmonyIcon from './icons/harmony.svg';
import horizenIcon from './icons/horizen.svg';
import hecoIcon from './icons/heco.svg';
import iotexIcon from './icons/iotex.svg';
import kintoIcon from './icons/kinto.svg';
import klaytnIcon from './icons/klaytn.svg';
import kusamaIcon from './icons/kusama.svg';
import metisIcon from './icons/metis.svg';
import blastIcon from './icons/blast.svg';
import bitlayerIcon from './icons/bitlayer.svg';
import moonbeamIcon from './icons/moonbeam.svg';
import multichainIcon from './icons/multichain.svg';
import nearIcon from './icons/near.svg';
import nervosIcon from './icons/nervos.svg';
import optimisimIcon from './icons/optimism.svg';
import polkadotIcon from './icons/polkadot.svg';
import polygonIcon from './icons/polygon.svg';
import polygonZkevmIcon from './icons/polygon-zkevm.svg';
import secretIcon from './icons/secret.svg';
import solIcon from './icons/sol.svg';
import stakeIcon from './icons/stake.svg';
import suiIcon from './icons/sui.svg';
import syscoinIcon from './icons/syscoin.svg';
import taikoIcon from './icons/taiko.svg';
import tronIcon from './icons/tron.svg';
import rolluxIcon from './icons/rollux.svg';
import mantleIcon from './icons/mantle.svg';
import zetachainIcon from './icons/zetachain.svg';
import baseIcon from './icons/base.png';
import scrollIcon from './icons/scroll.svg';
import okxX1Icon from './icons/okx.svg';
import okxX1IconDark from './darkModeIcons/okx.svg';
import tenetIcon from './icons/tenet.svg';
import zksyncEraIcon from './icons/zksync_era.svg';
import arbitrumNovaIconDark from './darkModeIcons/arbitrum-nova.svg';
import bttcIconDark from './darkModeIcons/bttc.svg';
import celoIconDark from './darkModeIcons/celo.svg';
import ethIconDark from './darkModeIcons/eth.svg';
import kavaIcon from './icons/kava.svg';
import kusamaIconDark from './darkModeIcons/kusama.svg';
import moonbeamIconDark from './darkModeIcons/moonbeam.svg';
import nearIconDark from './darkModeIcons/near.svg';
import nervosIconDark from './darkModeIcons/nervos.svg';
import secretIconDark from './darkModeIcons/secret.svg';
import solIconDark from './darkModeIcons/sol.svg';
import kintoIconDark from './darkModeIcons/kinto.svg';
import suiIconDark from './darkModeIcons/sui.svg';
import mantleIconDark from './darkModeIcons/mantle.svg';
import tenetIconDark from './darkModeIcons/tenet.svg';
import zksyncEraIconDark from './darkModeIcons/zksync_era.svg';
import berachainIconDark from './darkModeIcons/berachain.svg';
import blastIconDark from './darkModeIcons/blast.svg';
import berachainIcon from './icons/berachain.svg';
import seiIcon from './icons/sei.svg';
import xdcIcon from './icons/xdc.svg';
import xdcIconDark from './darkModeIcons/xdc.svg';
import lineaIcon from './icons/linea.svg';
import lineaIconDark from './darkModeIcons/linea.svg';
import stellarIcon from './icons/stellar.svg';
import stellarIconDark from './darkModeIcons/stellar.svg';
import bitlayerIconDark from './darkModeIcons/bitlayer.svg';

const chainIcons: Partial<Record<ChainID, string>> = {
  [ChainID.APTOS]: aptosIcon,
  [ChainID.ARBITRUM]: arbitrumIcon,
  [ChainID.ARBITRUM_TESTNET]: arbitrumIcon,
  [ChainID.ARBITRUM_SEPOLIA]: arbitrumIcon,
  [ChainID.ARBITRUM_NOVA]: arbitrumNovaIcon,
  [ChainID.AVALANCHE]: avaxIcon,
  [ChainID.AVALANCHE_C]: avaxIcon,
  [ChainID.AVALANCHE_EVM]: avaxIcon,
  [ChainID.AVALANCHE_FUJI]: avaxIcon,
  [ChainID.AVALANCHE_FUJI_C]: avaxIcon,
  [ChainID.AVALANCHE_FUJI_EVM]: avaxIcon,
  [ChainID.AVALANCHE_FUJI_P]: avaxIcon,
  [ChainID.AVALANCHE_FUJI_X]: avaxIcon,
  [ChainID.AVALANCHE_P]: avaxIcon,
  [ChainID.AVALANCHE_X]: avaxIcon,

  [ChainID.FLARE]: flareIcon,
  [ChainID.FLARE_C]: flareIcon,
  [ChainID.FLARE_EVM]: flareIcon,
  [ChainID.FLARE_P]: flareIcon,
  [ChainID.FLARE_X]: flareIcon,

  [ChainID.BSC]: bscIcon,
  [ChainID.BSC_TESTNET_CHAPEL]: bscIcon,

  [ChainID.BASE]: baseIcon,
  [ChainID.BASE_TESTNET]: baseIcon,
  [ChainID.BASE_SEPOLIA]: baseIcon,

  [ChainID.BERACHAIN]: berachainIcon,
  [ChainID.BERACHAIN_TESTNET]: berachainIcon,
  [ChainID.BERACHAIN_GUARDED_TESTNET]: berachainIcon,
  [ChainID.BERACHAIN_GUARDED_TESTNET_EVM]: berachainIcon,

  [ChainID.BLAST]: blastIcon,
  [ChainID.BLAST_TESTNET_SEPOLIA]: blastIcon,

  [ChainID.BTC]: btcIcon,
  [ChainID.BTTC]: bttcIcon,
  [ChainID.BITLAYER]: bitlayerIcon,
  [ChainID.BITLAYER_TESTNET]: bitlayerIcon,
  [ChainID.CELO]: celoIcon,
  [ChainID.CHILIZ]: chilizIcon,
  [ChainID.CHILIZ_TESTNET]: chilizIcon,
  [ChainID.CORE]: coreIcon,
  [ChainID.ETH]: ethIcon,
  [ChainID.ETH_BEACON]: ethIcon,
  [ChainID.ETH_KOVAN]: ethIcon,
  [ChainID.ETH_RINKEBY]: ethIcon,
  [ChainID.ETH_ROPSTEN]: ethIcon,
  [ChainID.ETH_SEPOLIA]: ethIcon,
  [ChainID.ETH_SEPOLIA_BEACON]: ethIcon,
  [ChainID.ETH_HOLESKY]: ethIcon,
  [ChainID.ETH_HOLESKY_BEACON]: ethIcon,
  [ChainID.FANTOM]: ftmIcon,
  [ChainID.FANTOM_TESTNET]: ftmIcon,
  [ChainID.FILECOIN]: filecoinIcon,
  [ChainID.GNOSIS]: gnosisIcon,
  [ChainID.GNOSIS_BEACON]: gnosisIcon,
  [ChainID.GNOSIS_TESTNET]: gnosisIcon,
  [ChainID.GNOSIS_TESTNET_BEACON]: gnosisIcon,
  [ChainID.HARMONY]: harmonyIcon,
  [ChainID.HORIZEN]: horizenIcon,
  [ChainID.HORIZEN_EVM]: horizenIcon,
  [ChainID.HORIZEN_TESTNET]: horizenIcon,
  [ChainID.HORIZEN_TESTNET_EVM]: horizenIcon,
  [ChainID.HECO]: hecoIcon,
  [ChainID.HECO_TESTNET]: hecoIcon,
  [ChainID.IOTEX]: iotexIcon,
  [ChainID.IOTEX_TESTNET]: iotexIcon,

  [ChainID.KAVA]: kavaIcon,
  [ChainID.KAVA_COSMOS_REST]: kavaIcon,
  [ChainID.KAVA_EVM]: kavaIcon,
  [ChainID.KAVA_TENDERMINT_REST]: kavaIcon,
  [ChainID.KAVA_TENDERMINT_RPC]: kavaIcon,
  [ChainID.KAVA_TESTNET]: kavaIcon,
  [ChainID.KAVA_COSMOS_REST_TESTNET]: kavaIcon,
  [ChainID.KAVA_EVM_TESTNET]: kavaIcon,
  [ChainID.KAVA_TENDERMINT_REST_TESTNET]: kavaIcon,
  [ChainID.KAVA_TENDERMINT_RPC_TESTNET]: kavaIcon,

  [ChainID.KINTO]: kintoIcon,
  [ChainID.KLAYTN]: klaytnIcon,
  [ChainID.KLAYTN_TESTNET]: klaytnIcon,
  [ChainID.KUSAMA]: kusamaIcon,
  [ChainID.MANTLE]: mantleIcon,
  [ChainID.MANTLE_TESTNET]: mantleIcon,
  [ChainID.MANTLE_SEPOLIA]: mantleIcon,
  [ChainID.METIS]: metisIcon,
  [ChainID.MOONBEAM]: moonbeamIcon,
  [ChainID.MULTICHAIN]: multichainIcon,
  [ChainID.NEAR]: nearIcon,
  [ChainID.NERVOS]: nervosIcon,
  [ChainID.NERVOS_CKB]: nervosIcon,
  [ChainID.NERVOS_GW]: nervosIcon,
  [ChainID.OKX_X1]: okxX1Icon,
  [ChainID.OKX_X1_TESTNET]: okxX1Icon,
  [ChainID.OPTIMISM]: optimisimIcon,
  [ChainID.OPTIMISM_TESTNET]: optimisimIcon,
  [ChainID.OPTIMISM_SEPOLIA]: optimisimIcon,
  [ChainID.POLKADOT]: polkadotIcon,
  [ChainID.POLYGON]: polygonIcon,
  [ChainID.POLYGON_MUMBAI]: polygonIcon,
  [ChainID.POLYGON_AMOY]: polygonIcon,
  [ChainID.POLYGON_ZKEVM]: polygonZkevmIcon,
  [ChainID.POLYGON_ZKEVM_TESTNET]: polygonZkevmIcon,
  [ChainID.POLYGON_ZKEVM_CARDONA]: polygonZkevmIcon,
  [ChainID.ROLLUX]: rolluxIcon,
  [ChainID.ROLLUX_OPNODE]: rolluxIcon,
  [ChainID.ROLLUX_OPNODE_TESTNET]: rolluxIcon,
  [ChainID.ROLLUX_TESTNET]: rolluxIcon,

  [ChainID.STELLAR]: stellarIcon,
  [ChainID.STELLAR_HORIZON]: stellarIcon,
  [ChainID.STELLAR_TESTNET]: stellarIcon,
  [ChainID.STELLAR_TESTNET_HORIZON]: stellarIcon,
  [ChainID.STELLAR_TESTNET_SOROBAN]: stellarIcon,

  [ChainID.SCROLL]: scrollIcon,
  [ChainID.SCROLL_TESTNET]: scrollIcon,
  [ChainID.SCROLL_SEPOLIA_TESTNET]: scrollIcon,

  [ChainID.SECRET]: secretIcon,
  [ChainID.SECRET_COSMOS]: secretIcon,
  [ChainID.SECRET_COSMOS_GRPC_WEB]: secretIcon,
  [ChainID.SECRET_COSMOS_REST]: secretIcon,
  [ChainID.SECRET_REST]: secretIcon,
  [ChainID.SECRET_RPC]: secretIcon,

  [ChainID.SEI]: seiIcon,
  [ChainID.SEI_COSMOS_GRPC_WEB]: seiIcon,
  [ChainID.SEI_COSMOS_REST]: seiIcon,
  [ChainID.SEI_REST]: seiIcon,
  [ChainID.SEI_RPC]: seiIcon,
  [ChainID.SEI_TESTNET]: seiIcon,
  [ChainID.SEI_RPC_TESTNET]: seiIcon,
  [ChainID.SEI_REST_TESTNET]: seiIcon,
  [ChainID.SEI_COSMOS_REST_TESTNET]: seiIcon,
  [ChainID.SEI_COSMOS_GRPC_TESTNET]: seiIcon,

  [ChainID.SOLANA]: solIcon,
  [ChainID.SOLANA_DEVNET]: solIcon,
  [ChainID.SYSCOIN]: syscoinIcon,

  [ChainID.TAIKO]: taikoIcon,
  [ChainID.TAIKO_KATLA]: taikoIcon,

  [ChainID.TRON]: tronIcon,
  [ChainID.TRON_JSON_RPC]: tronIcon,
  [ChainID.TENET]: tenetIcon,
  [ChainID.XDAI]: stakeIcon,
  [ChainID.SUI]: suiIcon,
  [ChainID.SUI_TESTNET]: suiIcon,

  [ChainID.XDC]: xdcIcon,
  [ChainID.XDC_TESTNET]: xdcIcon,

  [ChainID.ZETACHAIN]: zetachainIcon,
  [ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET]: zetachainIcon,
  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]: zetachainIcon,
  [ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET]: zetachainIcon,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET]: zetachainIcon,
  [ChainID.ZETACHAIN_ATHENS_TESTNET]: zetachainIcon,
  [ChainID.ZKSYNC_ERA]: zksyncEraIcon,
  [ChainID.ZKSYNC_ERA_SEPOLIA]: zksyncEraIcon,
  [ChainID.ZKSYNC_ERA_TESTNET]: zksyncEraIcon,

  [ChainID.LINEA]: lineaIcon,
};

const darkModeChainIcons: Partial<Record<ChainID, string>> = {
  ...chainIcons,
  [ChainID.ARBITRUM_NOVA]: arbitrumNovaIconDark,
  [ChainID.BERACHAIN]: berachainIconDark,
  [ChainID.BERACHAIN_TESTNET]: berachainIconDark,
  [ChainID.BERACHAIN_GUARDED_TESTNET]: berachainIconDark,
  [ChainID.BERACHAIN_GUARDED_TESTNET_EVM]: berachainIconDark,
  [ChainID.BITLAYER]: bitlayerIconDark,
  [ChainID.BITLAYER_TESTNET]: bitlayerIconDark,
  [ChainID.BTTC]: bttcIconDark,
  [ChainID.BLAST]: blastIconDark,
  [ChainID.BLAST_TESTNET_SEPOLIA]: blastIconDark,
  [ChainID.CELO]: celoIconDark,
  [ChainID.ETH]: ethIconDark,
  [ChainID.ETH_BEACON]: ethIconDark,
  [ChainID.ETH_KOVAN]: ethIconDark,
  [ChainID.ETH_RINKEBY]: ethIconDark,
  [ChainID.ETH_ROPSTEN]: ethIconDark,
  [ChainID.ETH_SEPOLIA]: ethIconDark,
  [ChainID.ETH_SEPOLIA_BEACON]: ethIconDark,
  [ChainID.ETH_HOLESKY]: ethIconDark,
  [ChainID.ETH_HOLESKY_BEACON]: ethIconDark,
  [ChainID.KINTO]: kintoIconDark,
  [ChainID.KUSAMA]: kusamaIconDark,
  [ChainID.MANTLE]: mantleIconDark,
  [ChainID.MANTLE_TESTNET]: mantleIconDark,
  [ChainID.MANTLE_SEPOLIA]: mantleIconDark,
  [ChainID.MOONBEAM]: moonbeamIconDark,
  [ChainID.NEAR]: nearIconDark,
  [ChainID.NERVOS]: nervosIconDark,
  [ChainID.NERVOS_CKB]: nervosIconDark,
  [ChainID.NERVOS_GW]: nervosIconDark,
  [ChainID.OKX_X1]: okxX1IconDark,
  [ChainID.OKX_X1_TESTNET]: okxX1IconDark,
  [ChainID.TENET]: tenetIconDark,
  [ChainID.SECRET]: secretIconDark,
  [ChainID.SECRET_COSMOS]: secretIconDark,
  [ChainID.SECRET_COSMOS_GRPC_WEB]: secretIconDark,
  [ChainID.SECRET_COSMOS_REST]: secretIconDark,
  [ChainID.SECRET_REST]: secretIconDark,
  [ChainID.SECRET_RPC]: secretIconDark,
  [ChainID.SOLANA]: solIconDark,
  [ChainID.SOLANA_DEVNET]: solIconDark,
  [ChainID.SUI]: suiIconDark,
  [ChainID.SUI_TESTNET]: suiIconDark,
  [ChainID.ZKSYNC_ERA]: zksyncEraIconDark,
  [ChainID.ZKSYNC_ERA_SEPOLIA]: zksyncEraIconDark,
  [ChainID.ZKSYNC_ERA_TESTNET]: zksyncEraIconDark,
  [ChainID.XDC]: xdcIconDark,
  [ChainID.XDC_TESTNET]: xdcIconDark,
  [ChainID.LINEA]: lineaIconDark,
  [ChainID.STELLAR]: stellarIconDark,
  [ChainID.STELLAR_HORIZON]: stellarIconDark,
  [ChainID.STELLAR_TESTNET]: stellarIconDark,
  [ChainID.STELLAR_TESTNET_HORIZON]: stellarIconDark,
  [ChainID.STELLAR_TESTNET_SOROBAN]: stellarIconDark,
};

const chainNameIcons: Record<string, string> = {
  zetachain_testnet: zetachainIcon,
  zetachain_evm_testnet: zetachainIcon,
  zetachain_tendermint_testnet: zetachainIcon,
  zetachain_athens_testnet: zetachainIcon,
  zetachain_evm_athens_testnet: zetachainIcon,
  zetachain_tendermint_athens_testnet: zetachainIcon,
  tenet_evm: tenetIcon,
  horizen_eon: horizenIcon,
  horizen_gobi_testnet: horizenIcon,
  aptos_testnet: aptosIcon,
  filecoin_testnet: filecoinIcon,
  zksync_era_testnet: zksyncEraIcon,
  zksync_era_sepolia: zksyncEraIcon,
  berachain_guarded_testnet_evm: berachainIcon,
  sei_cosmos: seiIcon,
  sei_grpc: seiIcon,
  sei: seiIcon,
  sei_testnet: seiIcon,
  sei_cosmos_testnet: seiIcon,
  sei_grpc_testnet: seiIcon,
  stellar_horizon: stellarIcon,
  stellar_testnet_horizon: stellarIcon,
  stellar_testnet_soroban: stellarIcon,
  kava_evm: kavaIcon,
  kava_api: kavaIcon,
  kava_rpc: kavaIcon,
  kava_testnet_api: kavaIcon,
  kava_testnet_evm: kavaIcon,
  kava_testnet_rpc: kavaIcon,
};

const darkChainNameIcons: Record<string, string> = {
  ...chainNameIcons,
  tenet_evm: tenetIconDark,
  berachain_guarded_testnet_evm: berachainIconDark,
  stellar_horizon: stellarIconDark,
  stellar_testnet_horizon: stellarIconDark,
  stellar_testnet_soroban: stellarIconDark,
};

export function getChainIcon(name: string, isLightTheme: boolean) {
  const iconNameMap = isLightTheme ? chainNameIcons : darkChainNameIcons;

  if (name in iconNameMap) {
    return iconNameMap[name];
  }

  const iconMap = isLightTheme ? chainIcons : darkModeChainIcons;

  return iconMap[name as keyof typeof chainIcons] || defaultIcon;
}

export const getBlockchainsUrls = (
  blockchains: string[] = [],
  isLightTheme = false,
) => {
  const blockchainIcons = blockchains.map(blockchain =>
    getChainIcon(blockchain as ChainID, isLightTheme),
  );

  const uniqueBlockchainUrls = [...new Set(blockchainIcons)];

  return uniqueBlockchainUrls;
};
