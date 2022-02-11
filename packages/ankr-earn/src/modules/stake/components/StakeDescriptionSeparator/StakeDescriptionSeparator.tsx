import { useStakeDescriptionSeparatorStyles } from './useStakeDescriptionSeparatorStyles';

export const StakeDescriptionSeparator = () => {
  const classes = useStakeDescriptionSeparatorStyles();

  return <div className={classes.root} />;
};
