import { AvailablePlatforms } from 'modules/trading-cockpit/types';
import React from 'react';
import { ReactComponent as AnkrIcon } from './assets/ankr.svg';
import { ReactComponent as CurveIcon } from './assets/curve.svg';
import { ReactComponent as SushiswapIcon } from './assets/sushiswap.svg';
import { ReactComponent as UniswapIcon } from './assets/uniswap.svg';

export const PlatformLogoMap = {
  [AvailablePlatforms.StakeFi]: AnkrIcon,
  [AvailablePlatforms.Curve]: CurveIcon,
  [AvailablePlatforms.SushiSwap]: SushiswapIcon,
  [AvailablePlatforms.UniswapV2]: UniswapIcon,
};

export type PlatformLogoType = keyof typeof PlatformLogoMap;

interface IPlatformLogoProps {
  className?: string;
  name: PlatformLogoType;
}

export const PlatformLogo = ({ className, name }: IPlatformLogoProps) => {
  const IconComponent = PlatformLogoMap[name] || 'span';

  return <IconComponent className={className} />;
};
