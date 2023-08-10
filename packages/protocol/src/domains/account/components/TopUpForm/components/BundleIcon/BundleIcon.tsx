import { Premium } from '@ankr.com/ui';

import { ReactComponent as Defs } from './assets/defs.svg';
import { useBundleIconStyles } from './BundleIconStyles';

export const BundleIcon = () => {
  const { classes } = useBundleIconStyles();

  return (
    <div className={classes.root}>
      <Premium className={classes.icon} />
      <Defs />
    </div>
  );
};
