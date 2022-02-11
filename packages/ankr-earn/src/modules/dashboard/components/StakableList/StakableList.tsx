import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface IStakableListProps {
  children?: ReactNode;
}

export const StakableList = ({ children }: IStakableListProps) => {
  return (
    <Grid container spacing={3}>
      {Children.map(
        children,
        (child, index) =>
          !!child && (
            <Grid item md={6} xs={12} lg="auto" key={uid(index)}>
              {child}
            </Grid>
          ),
      )}
    </Grid>
  );
};
