import { Grid } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

import { isChildNull, TNodeWithType } from 'modules/common/utils/children';

interface IAssetsListProps {
  children?: ReactNode | ReactNode[];
  noChildrenSlot?: JSX.Element;
}

export const AssetsList = ({ children, noChildrenSlot }: IAssetsListProps) => {
  if (!Children.count(children)) {
    return noChildrenSlot ?? null;
  }

  return (
    <Grid container spacing={3}>
      {Children.map(children, (child, index) =>
        !isChildNull(child as TNodeWithType) ? (
          <Grid item xs={12} lg={6} key={uid(index)}>
            {child}
          </Grid>
        ) : null,
      )}
    </Grid>
  );
};
