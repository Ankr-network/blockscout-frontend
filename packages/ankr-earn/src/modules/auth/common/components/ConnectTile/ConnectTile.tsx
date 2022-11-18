import { t } from '@ankr.com/common';
import { ButtonBase, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { Tooltip } from 'uiKit/Tooltip';

import { useConnectTileStyles } from './useConnectTileStyles';

interface IConnectTileProps {
  tooltip?: string;
  title: string;
  isDisabled?: boolean;
  iconSlot: JSX.Element;
  href?: string;
  onClick?: () => void;
}

export const ConnectTile = ({
  isDisabled = false,
  tooltip,
  title,
  iconSlot,
  href,
  onClick,
}: IConnectTileProps): JSX.Element => {
  const classes = useConnectTileStyles();
  const isLink = !!href && !isDisabled;

  const linkProps = {
    href,
    rel: 'noreferrer',
    target: '_blank',
    component: 'a',
  };

  const buttonProps = { onClick: isDisabled ? undefined : onClick };

  return (
    <Tooltip arrow title={isDisabled && tooltip ? t(tooltip) : ''}>
      <ButtonBase
        {...(isLink ? linkProps : buttonProps)}
        className={classNames(classes.root, {
          [classes.disabled]: isDisabled,
          [classes.disabledCursor]: isDisabled && !isLink,
        })}
      >
        {iconSlot}

        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>

        {isLink && (
          <Typography className={classes.install} variant="subtitle2">
            {t('wallets.wallet-install')}
          </Typography>
        )}
      </ButtonBase>
    </Tooltip>
  );
};
