import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t } from '@ankr.com/common';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  children?: ReactNode;
  chainName?: string;
}

export const Header = ({
  children,
  chainName = t('request-composer.header.evm'),
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('request-composer.header.title')}
      </Typography>
      <div className={classes.info}>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('request-composer.header.chain')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {chainName}
          </Typography>
        </div>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('request-composer.header.connection')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {t('request-composer.header.https')}
          </Typography>
        </div>
        {children}
      </div>
    </div>
  );
};
