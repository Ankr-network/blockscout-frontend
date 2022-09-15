import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t } from 'common';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: IHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('chain-item.request-composer.header.title')}
      </Typography>
      <div className={classes.info}>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('chain-item.request-composer.header.chain')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {t('chain-item.request-composer.header.evm')}
          </Typography>
        </div>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('chain-item.request-composer.header.connection')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {t('chain-item.request-composer.header.https')}
          </Typography>
        </div>
        {children}
      </div>
    </div>
  );
};
