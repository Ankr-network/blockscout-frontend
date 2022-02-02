import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

interface IAssetsListProps {
  children?: ReactNode;
  noChildrenSlot?: JSX.Element;
}

export const AssetsList = ({ children, noChildrenSlot }: IAssetsListProps) => {
  if (children && isChildNull(children)) {
    return noChildrenSlot ?? null;
  }

  return (
    <Grid container spacing={3}>
      {Children.map(children, (child, index) => (
        <Grid item xs={12} lg={6} key={uid(index)}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

// https://stackoverflow.com/a/64396494
const isChildNull = (children: any): boolean => {
  if (typeof children.type !== 'function') {
    throw new Error('isChildNull: children has no type method');
  }
  return children.type() === null;
};
