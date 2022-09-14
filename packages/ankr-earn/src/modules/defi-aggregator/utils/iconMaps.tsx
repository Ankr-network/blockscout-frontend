import { ReactNode } from 'react';

import { AAvaxBIcon } from '../../../uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from '../../../uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from '../../../uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from '../../../uiKit/Icons/ABNBCIcon';
import { ADOTBIcon } from '../../../uiKit/Icons/ADOTBIcon';
import { AETHBIcon } from '../../../uiKit/Icons/AETHBIcon';
import { AETHCIcon } from '../../../uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from '../../../uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from '../../../uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from '../../../uiKit/Icons/AMATICCIcon';
import { AvaxIcon } from '../../../uiKit/Icons/AvaxIcon';
import { BNBIcon } from '../../../uiKit/Icons/BNBIcon';
import { EthIcon } from '../../../uiKit/Icons/EthIcon';
import { FantomIcon } from '../../../uiKit/Icons/FantomIcon';
import { KsmIcon } from '../../../uiKit/Icons/KsmIcon';
import { MaticIcon } from '../../../uiKit/Icons/MaticIcon';
import { PolygonIcon } from '../../../uiKit/Icons/Polygon';
import { TDeFiNetwork, TDeFiProtocol } from '../api/defi';
import { ReactComponent as ProtocolAcryptos } from '../assets/protocol-acryptos.svg';
import { ReactComponent as ProtocolApeSwap } from '../assets/protocol-apeswap.svg';
import { ReactComponent as ProtocolBeefyFinance } from '../assets/protocol-beefy-finance.svg';
import { ReactComponent as ProtocolConvexFinance } from '../assets/protocol-convex-finance.svg';
import { ReactComponent as ProtocolCurveFinance } from '../assets/protocol-curve-finance.svg';
import { ReactComponent as ProtocolDystopia } from '../assets/protocol-dystopia.svg';
import { ReactComponent as ProtocolEllipsisFinance } from '../assets/protocol-ellipsis-finance.svg';
import { ReactComponent as ProtocolLydiaFinance } from '../assets/protocol-lydia-finance.svg';
import { ReactComponent as ProtocolOnxFinance } from '../assets/protocol-onx-finance.svg';
import { ReactComponent as ProtocolPancakeSwap } from '../assets/protocol-pancakeswap.svg';
import { ReactComponent as ProtocolPangolin } from '../assets/protocol-pangolin.svg';
import { ReactComponent as ProtocolQuickSwap } from '../assets/protocol-quickswap.svg';
import { ReactComponent as ProtocolSushiswap } from '../assets/protocol-sushiswap.svg';
import { ReactComponent as ProtocolTraderJoe } from '../assets/protocol-traderjoe.svg';
import { ReactComponent as ProtocolUniswap } from '../assets/protocol-uniswap.svg';
import { ReactComponent as ProtocolYearnFinance } from '../assets/protocol-yearn-finance.svg';

export const TOKEN_PROTOCOL_ICON_MAP: Record<TDeFiProtocol, ReactNode> = {
  acryptos: <ProtocolAcryptos />,
  apeSwap: <ProtocolApeSwap />,
  curveFinance: <ProtocolCurveFinance />,
  convexFinance: <ProtocolConvexFinance />,
  ellipsisFinance: <ProtocolEllipsisFinance />,
  onxFinance: <ProtocolOnxFinance />,
  sushiSwap: <ProtocolSushiswap />,
  uniswapV3: <ProtocolUniswap />,
  uniswapV2: <ProtocolUniswap />,
  yearnFinance: <ProtocolYearnFinance />,
  beefyFinance: <ProtocolBeefyFinance />,
  pancakeSwap: <ProtocolPancakeSwap />,
  quickSwap: <ProtocolQuickSwap />,
  dystopia: <ProtocolDystopia />,
  lydiaFinance: <ProtocolLydiaFinance />,
  pangolin: <ProtocolPangolin />,
  traderJoe: <ProtocolTraderJoe />,
};

export const TOKEN_ASSET_ICON_MAP: Record<string, ReactNode> = {
  ETH: <EthIcon />,
  aETHc: <AETHCIcon />,
  aETHb: <AETHBIcon />,
  BNB: <BNBIcon />,
  aBNBb: <ABNBBIcon />,
  aBNBc: <ABNBCIcon />,
  wMATIC: <MaticIcon />,
  MATIC: <MaticIcon />,
  aMATICb: <AMATICBIcon />,
  aMATICc: <AMATICCIcon />,
  AVAX: <AvaxIcon />,
  aAVAXb: <AAvaxBIcon />,
  aAVAXc: <AAvaxCIcon />,
  wFTM: <FantomIcon />,
  aFTMb: <AFTMBIcon />,
  aDOTb: <ADOTBIcon />,
  aKSMb: <KsmIcon />,
};

export const TOKEN_NETWORK_ICON_MAP: Record<TDeFiNetwork, ReactNode> = {
  ethereum: <EthIcon />,
  bnb: <BNBIcon />,
  polygon: <PolygonIcon />,
  avalanche: <AvaxIcon />,
  fantom: <FantomIcon />,
};
