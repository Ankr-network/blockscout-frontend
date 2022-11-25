import { ReactComponent as ArbitrumLogo } from 'assets/img/logo/arbitrum.svg';
import { ReactComponent as AvalancheLogo } from 'assets/img/logo/avalanche.svg';
import { ReactComponent as BinanceLogo } from 'assets/img/logo/binance.svg';
import { ReactComponent as EthereumLogo } from 'assets/img/logo/ethereum.svg';
import { ReactComponent as FantomLogo } from 'assets/img/logo/fantom.svg';
import { ReactComponent as GnosisLogo } from 'assets/img/logo/gnosis.svg';
import { ReactComponent as HarmonyLogo } from 'assets/img/logo/harmony.svg';
import { ReactComponent as IoTexLogo } from 'assets/img/logo/iotex.svg';
import { ReactComponent as KlaytnLogo } from 'assets/img/logo/klaytn.svg';
import { ReactComponent as MoonBeamLogo } from 'assets/img/logo/moonbeam.svg';
import { ReactComponent as NearLogo } from 'assets/img/logo/near.svg';
import { ReactComponent as NervosLogo } from 'assets/img/logo/nervos.svg';
import { ReactComponent as PolygonLogo } from 'assets/img/logo/polygon.svg';
// import { ReactComponent as SecretLogo } from 'assets/img/logo/secret.svg';
import { ReactComponent as SolanaLogo } from 'assets/img/logo/solana.svg';
import { ReactComponent as SyscoinLogo } from 'assets/img/logo/syscoin.svg';
import { ChainId } from 'domains/chains/api/chain';

export const MENU_LIST = [
  {
    chainId: ChainId.Ethereum,
    name: 'Ethereum',
    logo: <EthereumLogo />,
    url: 'https://eth.public-rpc.com/',
  },
  {
    chainId: ChainId.Solana,
    name: 'Solana',
    logo: <SolanaLogo />,
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
    logo: <PolygonLogo />,
    url: ' https://polygon-rpc.com/',
  },
  {
    chainId: ChainId.Nervos,
    name: 'Nervos',
    logo: <NervosLogo />,
    url: 'https://nervos.public-rpc.com/',
  },
  {
    chainId: ChainId.Harmony,
    name: 'Harmony',
    logo: <HarmonyLogo />,
    url: 'https://harmony.public-rpc.com/',
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
    chainId: ChainId.Moonbeam,
    name: 'MoonBeam',
    logo: <MoonBeamLogo />,
    url: 'https://moonbeam.public-rpc.com/',
  },
  {
    chainId: ChainId.Arbitrum,
    name: 'Arbitrum',
    logo: <ArbitrumLogo />,
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
    logo: <SyscoinLogo />,
    url: 'https://syscoin.public-rpc.com/',
  },
  // {
  //   chainId: ChainId.Secret,
  //   name: 'Secret',
  //   logo: <SecretLogo />,
  //   url: 'https://secret.public-rpc.com/',
  // },
  {
    chainId: ChainId.Klaytn,
    name: 'Klaytn',
    logo: <KlaytnLogo />,
    url: 'https://klaytn.public-rpc.com/',
  },
];
