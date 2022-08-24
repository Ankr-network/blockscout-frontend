import { ReactNode } from 'react';

import { useAssetsListStyles } from './useAssetsListStyles';

interface IAssetsListProps {
  children?: ReactNode | ReactNode[];
}

export const AssetsList = ({ children }: IAssetsListProps): JSX.Element => {
  const classes = useAssetsListStyles();
  return <div className={classes.root}>{children}</div>;
};
