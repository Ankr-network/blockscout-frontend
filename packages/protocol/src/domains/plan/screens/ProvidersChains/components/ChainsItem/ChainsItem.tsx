import React, { useRef, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';
import useHover from '@react-hook/hover';
import classNames from 'classnames';

import { useIsXSDown } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';

export const ChainsItem = ({
  logoSrc,
  name,
  onChainItemClick,
  onButtonClick,
}: ChainsItemProps) => {
  const classes = useStyles();

  const isXSDown = useIsXSDown();
  const target = useRef<HTMLDivElement | null>(null);
  const isHovering = useHover(target, { enterDelay: 200, leaveDelay: 200 });
  const hasHover = !isXSDown && isHovering;

  const handleClick = useCallback(() => {
    if (isXSDown) {
      onChainItemClick();
    }
  }, [isXSDown, onChainItemClick]);

  return (
    <div
      className={classes.root}
      role="button"
      tabIndex={0}
      ref={target}
      onClick={handleClick}
    >
      <div className={classes.cardWrapper}>
        <div
          className={classNames(
            classes.chainInfo,
            hasHover && classes.chainInfoHover,
          )}
        >
          <img className={classes.logo} src={logoSrc} alt={name} />
          <Typography variant="h4" noWrap className={classes.title}>
            {name}
          </Typography>
        </div>
        {!isXSDown && (
          <div
            className={classNames(
              classes.buttons,
              hasHover && classes.hoveredButtons,
            )}
          >
            <Button
              className={classes.button}
              variant="contained"
              onClick={onButtonClick}
            >
              {t('providers.chains.button')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
