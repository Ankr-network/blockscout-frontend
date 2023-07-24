import { ReactNode } from 'react';

import { BundleIcon } from '../../../BundleIcon';
import { useBundleLabelStyles } from './BundleLabelStyles';

export interface BundleLabelProps {
  label: ReactNode;
}

export const BundleLabel = ({ label }: BundleLabelProps) => {
  const { classes } = useBundleLabelStyles();

  return (
    <div className={classes.root}>
      <BundleIcon />
      {label}
    </div>
  );
};
