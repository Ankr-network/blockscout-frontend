import { t } from 'common';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { TDeFiProtocol } from '../api/defi';
import { ReactComponent as ProtocolAcryptos } from '../assets/protocol-acryptos.svg';
import { ReactComponent as ProtocolApeSwap } from '../assets/protocol-apeswap.svg';
import { ReactComponent as ProtocolBeefyFinance } from '../assets/protocol-beefy-finance.svg';
import { ReactComponent as ProtocolConvexFinance } from '../assets/protocol-convex-finance.svg';
import { ReactComponent as ProtocolCurveFinance } from '../assets/protocol-curve-finance.svg';
import { ReactComponent as ProtocolDotDot } from '../assets/protocol-dotdot.svg';
import { ReactComponent as ProtocolDystopia } from '../assets/protocol-dystopia.svg';
import { ReactComponent as ProtocolEllipsisFinance } from '../assets/protocol-ellipsis-finance.svg';
import { ReactComponent as ProtocolLydiaFinance } from '../assets/protocol-lydia-finance.svg';
import { ReactComponent as ProtocolOnxFinance } from '../assets/protocol-onx-finance.svg';
import { ReactComponent as ProtocolPancakeSwap } from '../assets/protocol-pancakeswap.svg';
import { ReactComponent as ProtocolPangolin } from '../assets/protocol-pangolin.svg';
import { ReactComponent as ProtocolQuickSwap } from '../assets/protocol-quickswap.svg';
import { ReactComponent as ProtocolSpookySwap } from '../assets/protocol-spookyswap.svg';
import { ReactComponent as ProtocolSushiswap } from '../assets/protocol-sushiswap.svg';
import { ReactComponent as ProtocolTraderJoe } from '../assets/protocol-traderjoe.svg';
import { ReactComponent as ProtocolUniswap } from '../assets/protocol-uniswap.svg';
import { ReactComponent as ProtocolYearnFinance } from '../assets/protocol-yearn-finance.svg';

interface IProtocol {
  icon: JSX.Element;
  title: string;
}

export const useProtocols = (): Record<TDeFiProtocol, IProtocol> =>
  useLocaleMemo<Record<TDeFiProtocol, IProtocol>>(
    () => ({
      apeSwap: {
        title: t('defi.protocols.apeSwap'),
        icon: <ProtocolApeSwap />,
      },
      acryptos: {
        title: t('defi.protocols.acryptos'),
        icon: <ProtocolAcryptos />,
      },
      beefyFinance: {
        title: t('defi.protocols.beefyFinance'),
        icon: <ProtocolBeefyFinance />,
      },
      convexFinance: {
        title: t('defi.protocols.convexFinance'),
        icon: <ProtocolConvexFinance />,
      },
      curveFinance: {
        title: t('defi.protocols.curveFinance'),
        icon: <ProtocolCurveFinance />,
      },
      dotdotFinance: {
        title: t('defi.protocols.dotdotFinance'),
        icon: <ProtocolDotDot />,
      },
      dystopia: {
        title: t('defi.protocols.dystopia'),
        icon: <ProtocolDystopia />,
      },
      ellipsisFinance: {
        title: t('defi.protocols.ellipsisFinance'),
        icon: <ProtocolEllipsisFinance />,
      },
      lydiaFinance: {
        title: t('defi.protocols.lydiaFinance'),
        icon: <ProtocolLydiaFinance />,
      },
      onxFinance: {
        title: t('defi.protocols.onxFinance'),
        icon: <ProtocolOnxFinance />,
      },
      pancakeSwap: {
        title: t('defi.protocols.pancakeSwap'),
        icon: <ProtocolPancakeSwap />,
      },
      pangolin: {
        title: t('defi.protocols.pangolin'),
        icon: <ProtocolPangolin />,
      },
      quickSwap: {
        title: t('defi.protocols.quickSwap'),
        icon: <ProtocolQuickSwap />,
      },
      sushiSwap: {
        title: t('defi.protocols.sushiSwap'),
        icon: <ProtocolSushiswap />,
      },
      traderJoe: {
        title: t('defi.protocols.traderJoe'),
        icon: <ProtocolTraderJoe />,
      },
      uniswapV2: {
        title: t('defi.protocols.uniswapV2'),
        icon: <ProtocolUniswap />,
      },
      uniswapV3: {
        title: t('defi.protocols.uniswapV3'),
        icon: <ProtocolUniswap />,
      },
      yearnFinance: {
        title: t('defi.protocols.yearnFinance'),
        icon: <ProtocolYearnFinance />,
      },
      spookySwap: {
        title: t('defi.protocols.spookySwap'),
        icon: <ProtocolSpookySwap />,
      },
    }),
    [],
  );
