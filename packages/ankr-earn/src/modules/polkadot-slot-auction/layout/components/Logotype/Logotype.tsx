import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { INDEX_PATH } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { NavLink } from 'uiKit/NavLink';
import { Body2 } from 'uiKit/Typography';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { useLogotypeStyles } from './useLogotypeStyles';

export interface ILogotypeProps {
  className?: string;
}

export const Logotype = ({ className }: ILogotypeProps) => {
  const classes = useLogotypeStyles();

  return (
    <Body2
      className={classNames(classes.component, className)}
      component="div"
      color="textPrimary"
    >
      <NavLink
        className={classes.link}
        activeClassName={classes.active}
        color="primary"
        href={INDEX_PATH}
        exactMatch={true}
      >
        <LogoIcon />
      </NavLink>
      <Box display="flex" className={classes.company}>
        {t('polkadot-slot-auction.title')}
      </Box>
    </Body2>
  );
};
