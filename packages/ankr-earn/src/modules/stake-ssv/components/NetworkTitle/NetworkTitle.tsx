import { SSVNetworkTitleIcon } from 'uiKit/Icons/SSVNetworkTitleIcon';

import { useNetworkTitleStyles } from './useNetworkTitleStyles';

export const NetworkTitle = (): JSX.Element => {
  const classes = useNetworkTitleStyles();

  return (
    <div className={classes.root}>
      <SSVNetworkTitleIcon className={classes.icon} />
    </div>
  );
};
