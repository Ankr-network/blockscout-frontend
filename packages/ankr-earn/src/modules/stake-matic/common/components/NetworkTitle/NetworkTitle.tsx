import { useNetworkTitle } from './hooks/useNetworkTitle';
import { useNetworkTitleStyles } from './useNetworkTitleStyles';

export const NetworkTitle = (): JSX.Element | null => {
  const classes = useNetworkTitleStyles();

  const { Icon, text } = useNetworkTitle();

  if (!Icon || !text) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />

      <div className={classes.text}>{text}</div>
    </div>
  );
};
