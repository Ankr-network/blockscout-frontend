import { Typography } from '@mui/material';
import { usePlaceholderStyles } from './PlaceholderStyles';

interface PlaceholderProps {
  title: string;
  subtitle: string;
}

export const Placeholder = ({ title, subtitle }: PlaceholderProps) => {
  const { classes } = usePlaceholderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <Typography variant="body2" className={classes.subtitle}>
        {subtitle}
      </Typography>
    </div>
  );
};
