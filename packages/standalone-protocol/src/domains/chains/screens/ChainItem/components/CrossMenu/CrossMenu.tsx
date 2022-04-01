import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { IconButton, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { t } from 'modules/i18n/utils/intl';
import {
  ITEM_HEIGHT,
  ANKR_LINK_HEIGHT,
  useCrossMenuStyles,
} from './CrossMenuStyles';
import { useIsMDUp, useIsSMDown } from 'ui';
import { ReactComponent as MenuIcon } from 'assets/img/menu.svg';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as AnkrLogo } from 'assets/img/logo/ankr.svg';
import { ReactComponent as SolanaLogo } from 'assets/img/logo/solana.svg';
import { ReactComponent as BinanceLogo } from 'assets/img/logo/binance.svg';
import { ReactComponent as PolygonLogo } from 'assets/img/logo/polygon.svg';
import { ReactComponent as NervosLogo } from 'assets/img/logo/nervos.svg';
import { ReactComponent as HarmonyLogo } from 'assets/img/logo/harmony.svg';
import { ReactComponent as FantomLogo } from 'assets/img/logo/fantom.svg';
import { ReactComponent as AvalancheLogo } from 'assets/img/logo/avalanche.svg';
import { ReactComponent as IoTexLogo } from 'assets/img/logo/iotex.svg';
import { ReactComponent as MoonBeamLogo } from 'assets/img/logo/moonbeam.svg';
import { ReactComponent as ArbitrumLogo } from 'assets/img/logo/arbitrum.svg';
import { ReactComponent as NearLogo } from 'assets/img/logo/near.svg';
import { ReactComponent as GnosisLogo } from 'assets/img/logo/gnosis.svg';
import { ReactComponent as SyscoinLogo } from 'assets/img/logo/syscoin.svg';
import { ChainId } from 'domains/chains/api/chain';

interface ICrossMenuProps {
  chainId: string;
}

export const CrossMenu = ({ chainId }: ICrossMenuProps) => {
  const MENU_LIST = useMemo(
    () => [
      {
        chainId: ChainId.Solana,
        name: 'Solana',
        logo: <SolanaLogo />,
        url: 'https://solana.public-rpc.com/ ',
      },
      {
        chainId: ChainId.BSC,
        name: 'Binance Smart Chain',
        logo: <BinanceLogo />,
        url: 'https://bscrpc.com/ ',
      },
      {
        chainId: ChainId.Polygon,
        name: 'Polygon',
        logo: <PolygonLogo />,
        url: 'https://polygon-rpc.com/ ',
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
        url: 'https://rpc.ftm.tools/ ',
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
        url: 'https://moonbeam.network/',
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
    ],
    [],
  );

  const MENU_HEIGHT = MENU_LIST.length * ITEM_HEIGHT + ANKR_LINK_HEIGHT;

  const classes = useCrossMenuStyles({ menuHeight: MENU_HEIGHT });
  const isSMDown = useIsSMDown();
  const isLessThanMaxMenuHeight = useMediaQuery(
    `@media (max-height: ${MENU_HEIGHT}px)`,
  );

  const [open, setOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleCloseMenu = () => {
    setOpen(false);
  };
  const isNotMobile = useIsMDUp();

  useEffect(() => {
    if (isNotMobile) {
      setOpen(false);
    }
  }, [isNotMobile]);

  return (
    <>
      <IconButton onClick={handleMenuClick} className={classes.dropMenu}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <div className={classNames(classes.root, open && classes.open, chainId)}>
        <div className={classes.menu}>
          <Scrollbars
            autoHeightMax={MENU_HEIGHT}
            autoHeight={!isLessThanMaxMenuHeight && !isSMDown}
            className={!isLessThanMaxMenuHeight && !isSMDown ? classes.bar : ''}
            style={
              isLessThanMaxMenuHeight && !isSMDown
                ? { height: `calc(100vh - ${ANKR_LINK_HEIGHT}px)` }
                : {}
            }
          >
            {MENU_LIST.map(item => (
              <a
                key={item.chainId}
                className={classes.item}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseMenu}
              >
                <div
                  className={classNames(
                    classes.logo,
                    chainId === item.chainId && classes.current,
                  )}
                >
                  {item.logo}
                </div>
                <div className={classNames(classes.name, chainId)}>
                  {item.name}
                </div>
              </a>
            ))}
          </Scrollbars>
        </div>
        <a
          className={classNames(classes.protocol, chainId)}
          href="https://www.ankr.com/protocol/public/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCloseMenu}
        >
          <AnkrLogo />
          <span className={classes.desc}>{t('cross-menu.ankr-protocol')}</span>
        </a>
      </div>
    </>
  );
};
