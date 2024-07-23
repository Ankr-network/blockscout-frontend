import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';

import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  chainName?: string;
  children?: ReactNode;
  hasTitle?: boolean;
}

export const Header = ({ chainName, children, hasTitle }: IHeaderProps) => {
  const { classes } = useHeaderStyles(hasTitle);

  return (
    <div className={classes.root}>
      {hasTitle && (
        <Typography className={classes.title} component="h2">
          {t('request-composer.header.title')}
        </Typography>
      )}
      <div className={classes.info}>
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('request-composer.header.chain')}
          </Typography>
          <Typography variant="body2" className={classes.content}>
            {chainName || t('request-composer.header.evm')}
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
