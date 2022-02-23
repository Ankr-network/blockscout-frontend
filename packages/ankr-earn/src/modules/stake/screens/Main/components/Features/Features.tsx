import { Grid } from '@material-ui/core';
import React, { Children, ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';

interface IFeaturesProps {
  children?: ReactNode;
}

export const Features = ({ children }: IFeaturesProps): JSX.Element => {
  const renderedChildren = useMemo(
    () =>
      Children.map(
        children,
        (child, index) =>
          child && (
            <Grid key={uid(index)} item lg={4} md={6} xs={12}>
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
