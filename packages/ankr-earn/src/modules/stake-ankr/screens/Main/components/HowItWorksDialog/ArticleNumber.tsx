import { useHowItWorksDialogStyles } from './useHowItWorksDialogStyles';

export const ArticleNumber = ({ value }: { value: number }): JSX.Element => {
  const classes = useHowItWorksDialogStyles();

  return <div className={classes.circle}>{value}</div>;
};
