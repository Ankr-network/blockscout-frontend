import classNames from 'classnames';
import React, { FC, SVGProps } from 'react';

import { AvailablePlatforms } from 'modules/trading-cockpit/types';

import { ReactComponent as AnkrIcon } from './assets/ankr.svg';
import { ReactComponent as CurveIcon } from './assets/curve.svg';
import LydiaIcon from './assets/lydia.png';
import { ReactComponent as OpenOceanIcon } from './assets/openocean.svg';
import PangolinIcon from './assets/pangolin.png';
import { ReactComponent as SushiswapIcon } from './assets/sushiswap.svg';
import TraderjoeIcon from './assets/traderjoe.png';
import { ReactComponent as UniswapIcon } from './assets/uniswap.svg';
import { usePlatformLogoStyles } from './usePlatformLogoStyles';

export const PlatformLogoMap: Record<
  AvailablePlatforms,
  FC<SVGProps<SVGSVGElement>> | string
> = {
  [AvailablePlatforms.StakeFi]: AnkrIcon,
  [AvailablePlatforms.Curve]: CurveIcon,
  [AvailablePlatforms.SushiSwap]: SushiswapIcon,
  [AvailablePlatforms.UniswapV2]: UniswapIcon,
  [AvailablePlatforms.UniswapV3]: UniswapIcon,
  [AvailablePlatforms.Lydia]: LydiaIcon,
  [AvailablePlatforms.TraderJoe]: TraderjoeIcon,
  [AvailablePlatforms.Pangolin]: PangolinIcon,
  [AvailablePlatforms.OpenOceanV2]: OpenOceanIcon,
};

interface IPlatformLogoProps {
  className?: string;
  name: AvailablePlatforms;
}

export const PlatformLogo = ({
  className,
  name,
}: IPlatformLogoProps): JSX.Element => {
  const platformLogo = PlatformLogoMap[name];
  const classes = usePlatformLogoStyles();

  if (typeof platformLogo === 'string') {
    return (
      <img
        alt={name}
        className={classNames(className, classes.icon, classes.iconImg)}
        src={platformLogo}
      />
    );
  }

  const Logo = platformLogo;
  return <Logo className={classNames(className, classes.icon)} />;
};
