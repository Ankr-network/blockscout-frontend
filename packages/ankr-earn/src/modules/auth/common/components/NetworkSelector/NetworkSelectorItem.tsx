import { Box, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { MouseEventHandler, useCallback, useState } from 'react';

import { t } from 'common';

import { useNetworkSelectorStyles } from './useNetworkSelectorStyles';

interface INetworkSelectorItemProps {
  iconSlot: JSX.Element;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  oldVersion?: boolean;
}

export const NetworkSelectorItem = ({
  iconSlot,
  title,
  onClick,
  disabled,
  oldVersion = false,
}: INetworkSelectorItemProps): JSX.Element => {
  const classes = useNetworkSelectorStyles();
  const [hover, setHover] = useState(false);

  const setHoverTrue = useCallback(() => setHover(true), []);
  const setHoverFalse = useCallback(() => setHover(false), []);

  return (
    <button
      className={classNames(
        oldVersion ? classes.oldItem : classes.item,
        !disabled && classes.itemClickable,
      )}
      disabled={disabled}
      type="button"
      onClick={onClick}
      onMouseEnter={
        setHoverTrue as MouseEventHandler<HTMLButtonElement> | undefined
      }
      onMouseLeave={
        setHoverFalse as MouseEventHandler<HTMLButtonElement> | undefined
      }
    >
      {oldVersion ? (
        <>
          {iconSlot}

          <Typography className={classes.itemTitle} variant="body2">
            {title}
          </Typography>
        </>
      ) : (
        <>
          <Box alignItems="center" display="flex">
            {React.cloneElement(iconSlot, {
              className: classes.icon,
            })}

            <Typography className={classes.itemTitle} variant="body2">
              {title}
            </Typography>
          </Box>

          {hover && (
            <Typography className={classes.connect} variant="body2">
              {t('connect.connect')}
            </Typography>
          )}
        </>
      )}
    </button>
  );
};
