import { t } from '@ankr.com/common';
import { Box, BoxProps } from '@material-ui/core';

import { useAuditInfoStyles } from './useAuditInfoStyles';

export const AuditInfo = ({
  children,
  ...restProps
}: BoxProps): JSX.Element => {
  const classes = useAuditInfoStyles();

  return (
    <Box {...restProps} className={classes.root}>
      {t('audit-info.label')}

      {children}
    </Box>
  );
};
