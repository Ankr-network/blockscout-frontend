import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface IAssetsListProps {
  children?: ReactNode | ReactNode[];
}

export const AssetsList = ({ children }: IAssetsListProps): JSX.Element => {
  return (
    <Grid container spacing={3}>
      {Children.map(
        children,
        (child, index) =>
          !!child && (
            <Grid key={uid(index)} item lg={12} xs={12}>
              {child}
            </Grid>
          ),
      )}
    </Grid>
  );
};
