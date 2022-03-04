import { Grid } from '@material-ui/core';
import React, { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface ITokenVariantListProps {
  children?: ReactNode;
}

export const TokenVariantList = ({
  children,
}: ITokenVariantListProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      {Children.map(
        children,
        (child, index) =>
          !!child && (
            <Grid key={uid(index)} item xs="auto">
              {child}
            </Grid>
          ),
      )}
    </Grid>
  );
};
