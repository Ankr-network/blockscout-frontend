import { Ankr } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useRPCLogoStyles } from './useRPCLogoStyles';

export type RPCLogoClasses = ReturnType<typeof useRPCLogoStyles>['classes'];

export interface RPCLogoProps {
  classes?: Partial<RPCLogoClasses>;
}

export const RPCLogo = ({ classes: classesOverrides = {} }: RPCLogoProps) => {
  const { classes } = useRPCLogoStyles(undefined, {
    props: { classes: classesOverrides },
  });

  return (
    <div className={classes.root}>
      <Ankr className={classes.icon} color="primary" />
      <Typography
        className={classes.text}
        color="primary"
        component="span"
        variant="h6"
      >
        {t('title')}
      </Typography>
    </div>
  );
};
