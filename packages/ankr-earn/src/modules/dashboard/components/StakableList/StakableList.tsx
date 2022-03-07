import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface IStakableListProps {
  children?: ReactNode;
}

export const StakableList = ({ children }: IStakableListProps): JSX.Element => {
  return (
    <Grid container spacing={3}>
      {Children.map(
        children,
        (child, index) =>
          !!child && (
            <Grid key={uid(index)} item lg="auto" md={6} xs={12}>
              {child}
            </Grid>
          ),
      )}
    </Grid>
  );
};
