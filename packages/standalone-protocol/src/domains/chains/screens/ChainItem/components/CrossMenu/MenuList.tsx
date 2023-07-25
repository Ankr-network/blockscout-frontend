import { ReactComponent as ArbitrumLogo } from 'assets/img/logo/arbitrum.svg';
import { ReactComponent as ArbitrumMobileLogo } from 'assets/img/logo/arbitrumMobile.svg';
import { ReactComponent as AvalancheLogo } from 'assets/img/logo/avalanche.svg';
import { ReactComponent as BinanceLogo } from 'assets/img/logo/binance.svg';
import { ReactComponent as EthereumLogo } from 'assets/img/logo/ethereum.svg';
import { ReactComponent as EthereumMobileLogo } from 'assets/img/logo/ethereumMobile.svg';
import { ReactComponent as FantomLogo } from 'assets/img/logo/fantom.svg';
import { ReactComponent as GnosisLogo } from 'assets/img/logo/gnosis.svg';
import { ReactComponent as HarmonyLogo } from 'assets/img/logo/harmony.svg';
import { ReactComponent as HarmonyMobileLogo } from 'assets/img/logo/harmonyMobile.svg';
import { ReactComponent as HorizenLogo } from 'assets/img/logo/horizen.svg';
import { ReactComponent as HorizenMobileLogo } from 'assets/img/logo/horizenMobile.svg';
import { ReactComponent as IoTexLogo } from 'assets/img/logo/iotex.svg';
import { ReactComponent as KlaytnLogo } from 'assets/img/logo/klaytn.svg';
import { ReactComponent as KlaytnMobileLogo } from 'assets/img/logo/klaytnMobile.svg';
import { ReactComponent as MoonBeamLogo } from 'assets/img/logo/moonbeam.svg';
import { ReactComponent as MoonBeamMobileLogo } from 'assets/img/logo/moonbeamMobile.svg';
import { ReactComponent as NearLogo } from 'assets/img/logo/near.svg';
import { ReactComponent as NervosLogo } from 'assets/img/logo/nervos.svg';
import { ReactComponent as PolygonLogo } from 'assets/img/logo/polygon.svg';
import { ReactComponent as PolygonMobileLogo } from 'assets/img/logo/polygonMobile.svg';
import { ReactComponent as SecretLogo } from 'assets/img/logo/secret.svg';
import { ReactComponent as SolanaLogo } from 'assets/img/logo/solana.svg';
import { ReactComponent as SolanaMobileLogo } from 'assets/img/logo/solanaMobile.svg';
import { ReactComponent as FilecoinLogo } from 'assets/img/logo/filecoin.svg';
import { ReactComponent as SyscoinLogo } from 'assets/img/logo/syscoin.svg';
import { ReactComponent as SyscoinMobileLogo } from 'assets/img/logo/syscoinMobile.svg';
import { ReactComponent as PolygonZkemvLogo } from 'assets/img/logo/polygonZkemv.svg';
import { ReactComponent as PolygonZkemvMobileLogo } from 'assets/img/logo/polygonZkemvMobile.svg';
import { ReactComponent as TenetLogo } from 'assets/img/logo/tenet.svg';
import { ReactComponent as TenetMobileLogo } from 'assets/img/logo/tenetMobile.svg';
import { ReactComponent as ChilizLogo } from 'assets/img/logo/chiliz.svg';
import { ReactComponent as ZksyncEraLogo } from 'assets/img/logo/zksync_era.svg';
import { ReactComponent as ZksyncEraMobileLogo } from 'assets/img/logo/zksync_era_mobile.svg';
import {
  ChainId,
  HORIZEN_TESTNET_NAME,
  POLYGON_ZKEVM_CHAIN_NAME,
  TENET_NAME,
  ZKSYNC_ERA_NAME,
} from 'domains/chains/api/chain';
import { ReactComponent as RolluxLogo } from 'assets/img/logo/rollux.svg';
import { ReactComponent as RolluxMobileLogo } from 'assets/img/logo/rolluxMobile.svg';
import { ReactComponent as MantleLogo } from 'assets/img/logo/mantle.svg';

export const getMenuList = (isMobileSiderBar: boolean) => [
  {
    chainId: ChainId.Ethereum,
    name: 'Ethereum',
    logo: isMobileSiderBar ? <EthereumMobileLogo /> : <EthereumLogo />,
    url: 'https://eth.public-rpc.com/',
  },
  {
    chainId: ChainId.Solana,
    name: 'Solana',
    logo: isMobileSiderBar ? <SolanaMobileLogo /> : <SolanaLogo />,
    url: 'https://solana.public-rpc.com/',
  },
  {
    chainId: ChainId.BSC,
    name: 'Binance Smart Chain',
    logo: <BinanceLogo />,
    url: 'https://bscrpc.com/',
  },
  {
    chainId: ChainId.Polygon,
    name: 'Polygon',
    logo: isMobileSiderBar ? <PolygonMobileLogo /> : <PolygonLogo />,
    url: ' https://polygon-rpc.com/',
  },
  {
    chainId: ChainId.POLYGON_ZKEVM,
    name: POLYGON_ZKEVM_CHAIN_NAME,
    logo: isMobileSiderBar ? <PolygonZkemvMobileLogo /> : <PolygonZkemvLogo />,
    url: 'https://polygon-rpc.com/zkevm/',
  },
  {
    chainId: ChainId.Nervos,
    name: 'Nervos',
    logo: <NervosLogo />,
    url: 'https://nervos.public-rpc.com/',
  },
  {
    chainId: ChainId.Rollux,
    name: 'Rollux',
    logo: isMobileSiderBar ? <RolluxMobileLogo /> : <RolluxLogo />,
    url: 'https://rollux.public-rpc.com/',
  },
  {
    chainId: ChainId.Harmony,
    name: 'Harmony',
    logo: isMobileSiderBar ? <HarmonyMobileLogo /> : <HarmonyLogo />,
    url: 'https://harmony.public-rpc.com/',
  },
  {
    chainId: ChainId.HORIZEN_TESTNET_EVM,
    name: HORIZEN_TESTNET_NAME,
    logo: isMobileSiderBar ? <HorizenMobileLogo /> : <HorizenLogo />,
    url: 'https://horizen_testnet_evm.public-rpc.com/',
  },
  {
    chainId: ChainId.Fantom,
    name: 'Fantom',
    logo: <FantomLogo />,
    url: 'https://rpc.ftm.tools/',
  },
  {
    chainId: ChainId.Avalanche,
    name: 'Avalanche',
    logo: <AvalancheLogo />,
    url: 'https://avalanche.public-rpc.com/',
  },
  {
    chainId: ChainId.IoTeX,
    name: 'IoTeX',
    logo: <IoTexLogo />,
    url: 'https://iotexrpc.com/',
  },
  {
    chainId: ChainId.ZksyncEra,
    name: ZKSYNC_ERA_NAME,
    logo: isMobileSiderBar ? <ZksyncEraMobileLogo /> : <ZksyncEraLogo />,
    url: 'https://zksync_era.public-rpc.com/',
  },
  {
    chainId: ChainId.Tenet,
    name: TENET_NAME,
    logo: isMobileSiderBar ? <TenetMobileLogo /> : <TenetLogo />,
    url: 'https://tenet_evm.public-rpc.com/',
  },
  {
    chainId: ChainId.Mantle,
    name: 'Mantle',
    logo: <MantleLogo />,
    url: 'https://mantle.public-rpc.com/',
  },
  {
    chainId: ChainId.Chiliz,
    name: 'Chiliz',
    logo: <ChilizLogo />,
    url: 'https://chiliz.public-rpc.com/',
  },
  {
    chainId: ChainId.Moonbeam,
    name: 'MoonBeam',
    logo: isMobileSiderBar ? <MoonBeamMobileLogo /> : <MoonBeamLogo />,
    url: 'https://moonbeam.public-rpc.com/',
  },
  {
    chainId: ChainId.Arbitrum,
    name: 'Arbitrum',
    logo: isMobileSiderBar ? <ArbitrumMobileLogo /> : <ArbitrumLogo />,
    url: 'https://arbitrum.public-rpc.com/',
  },
  {
    chainId: ChainId.Near,
    name: 'Near',
    logo: <NearLogo />,
    url: 'https://near.public-rpc.com/',
  },
  {
    chainId: ChainId.Gnosis,
    name: 'Gnosis',
    logo: <GnosisLogo />,
    url: 'https://gnosis.public-rpc.com/',
  },
  {
    chainId: ChainId.Syscoin,
    name: 'Syscoin',
    logo: isMobileSiderBar ? <SyscoinMobileLogo /> : <SyscoinLogo />,
    url: 'https://syscoin.public-rpc.com/',
  },
  {
    chainId: ChainId.Secret,
    name: 'Secret',
    logo: <SecretLogo />,
    url: 'https://scrt.public-rpc.com/',
  },
  {
    chainId: ChainId.Filecoin,
    name: 'Filecoin',
    logo: <FilecoinLogo />,
    url: 'https://filecoin.public-rpc.com/',
  },
  {
    chainId: ChainId.Klaytn,
    name: 'Klaytn',
    logo: isMobileSiderBar ? <KlaytnMobileLogo /> : <KlaytnLogo />,
    url: 'https://klaytn.public-rpc.com/',
  },
];
