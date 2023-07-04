import { BundleIcon } from '../../../BundleIcon';
import { useBundleLabelStyles } from './BundleLabelStyles';

export interface BundleLabelProps {
  label: string;
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
