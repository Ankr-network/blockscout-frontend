import { Grid } from '@material-ui/core';
import React, { Children, ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';

interface IFeaturesProps {
  children?: ReactNode;
}

export const Features = ({ children }: IFeaturesProps) => {
  const renderedChildren = useMemo(
    () =>
      Children.map(
        children,
        (child, index) =>
          child && (
            <Grid item xs={12} md={6} lg={4} key={uid(index)}>
              {child}
            </Grid>
          ),
      ),
    [children],
  );

  return (
    <Grid container spacing={3}>
      {renderedChildren}
    </Grid>
  );
};
