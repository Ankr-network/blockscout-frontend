import React, { useState, useCallback, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useIsMDUp } from 'ui';
import { ReactComponent as MenuIcon } from 'assets/img/menu.svg';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as AnkrLogo } from 'assets/img/logo/ankr.svg';
import { PROTOCOL_URL } from 'Routes';
import { useCrossMenuStyles } from './CrossMenuStyles';
import { MENU_LIST } from './MenuList';

interface ICrossMenuProps {
  chainId: string;
}

export const CrossMenu = ({ chainId }: ICrossMenuProps) => {
  const classes = useCrossMenuStyles();

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
    <div data-test-id="cross-menu">
      <IconButton onClick={handleMenuClick} className={classes.dropMenu}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <div
        className={classNames(classes.root, open && classes.open, chainId)}
        data-test-id="cross-menu-root"
      >
        <div className={classes.menu}>
          {MENU_LIST.map(item => (
            <a
              key={item.chainId}
              className={classes.item}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCloseMenu}
              data-test-id={
                chainId === item.chainId ? 'active-cross-menu' : null
              }
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
        </div>
        <a
          className={classNames(classes.protocol, chainId)}
          href={PROTOCOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCloseMenu}
        >
          <AnkrLogo />
          <span className={classes.desc}>{t('cross-menu.ankr-protocol')}</span>
        </a>
      </div>
    </div>
  );
};
