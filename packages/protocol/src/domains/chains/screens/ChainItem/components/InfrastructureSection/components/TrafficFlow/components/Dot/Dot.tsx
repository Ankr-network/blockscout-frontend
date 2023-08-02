import { useDotStyles } from './DotStyles';

export const Dot = () => {
  const { classes } = useDotStyles();

  return <div className={classes.root} />;
};
