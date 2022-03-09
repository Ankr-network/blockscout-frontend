import { useStakeDescriptionSeparatorStyles } from './useStakeDescriptionSeparatorStyles';

export const StakeDescriptionSeparator = (): JSX.Element => {
  const classes = useStakeDescriptionSeparatorStyles();

  return <div className={classes.root} />;
};
