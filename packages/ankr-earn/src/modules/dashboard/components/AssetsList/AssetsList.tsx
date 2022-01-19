import { Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { uid } from 'react-uid';

interface IAssetsListProps {
  children?: ReactNode;
  noChildrenSlot?: JSX.Element;
}

export const AssetsList = ({ children, noChildrenSlot }: IAssetsListProps) => {
  if (!children) {
    return noChildrenSlot ?? null;
  }

  return (
    <Grid container spacing={3}>
      {React.Children.map(children, (child, index) => (
        <Grid item xs={12} lg={6} key={uid(index)}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
