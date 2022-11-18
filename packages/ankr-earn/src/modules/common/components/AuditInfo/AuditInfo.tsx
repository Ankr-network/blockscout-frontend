import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { useAuditInfoStyles } from './useAuditInfoStyles';

interface IAuditInfoProps {
  children: ReactNode;
}

export const AuditInfo = ({ children }: IAuditInfoProps): JSX.Element => {
  const classes = useAuditInfoStyles();

  return (
    <Typography className={classes.root} color="textSecondary" variant="body2">
      {t('audit-info.label')}

      {children}
    </Typography>
  );
};
