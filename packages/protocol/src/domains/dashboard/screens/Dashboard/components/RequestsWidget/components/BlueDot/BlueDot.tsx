import { useBlueDotStyles } from './BlueDotStyles';

export const BlueDot = () => {
  const { classes } = useBlueDotStyles();

  return <div className={classes.root} />;
};
