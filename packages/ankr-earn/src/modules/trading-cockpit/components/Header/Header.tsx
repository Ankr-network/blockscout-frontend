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
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <Box {...boxProps}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md>
            {formSlot}
          </Grid>

          <Grid item xs={12} md="auto">
            {fairValueSlot}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
