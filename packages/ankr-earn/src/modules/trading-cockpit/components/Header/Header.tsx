import { Box, BoxProps, Grid, Paper } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps extends BoxProps {
  formSlot?: ReactNode;
  fairValueSlot?: ReactNode;
}

export const Header = ({
  formSlot,
  fairValueSlot,
  ...boxProps
}: IHeaderProps): JSX.Element => {
  const classes = useHeaderStyles();

  return (
    <Box {...boxProps}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item md xs={12}>
            {formSlot}
          </Grid>

          <Grid item md="auto" xs={12}>
            {fairValueSlot}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
