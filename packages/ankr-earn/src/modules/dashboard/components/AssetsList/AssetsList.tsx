import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface IAssetsListProps {
  children?: ReactNode | ReactNode[];
}

export const AssetsList = ({ children }: IAssetsListProps) => {
  return (
    <Grid container spacing={3}>
      {Children.map(
        children,
        (child, index) =>
          !!child && (
            <Grid item xs={12} lg={6} key={uid(index)}>
              {child}
            </Grid>
          ),
      )}
    </Grid>
  );
};
