import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useCrossMenuStyles } from './CrossMenuStyles';
import { useIsMDUp } from 'ui';
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
import { ReactComponent as ArbitrumLogo } from 'assets/img/logo/arbitrum.svg';
import { ReactComponent as NearLogo } from 'assets/img/logo/near.svg';
import classNames from 'classnames';
import { ChainId } from 'domains/chains/api/chain';

interface ICrossMenuProps {
  chainId: string;
}

export const CrossMenu = ({ chainId }: ICrossMenuProps) => {
  const classes = useCrossMenuStyles();

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
        url: '', // TODO Harmony url
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
    ],
    [],
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
      <div className={classNames(classes.root, open && classes.open)}>
        <div className={classes.menu}>
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
              <div className={classes.name}>{item.name}</div>
            </a>
          ))}
        </div>
        <a
          className={classes.protocol}
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
