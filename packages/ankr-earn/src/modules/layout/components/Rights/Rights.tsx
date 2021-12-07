import { Typography } from '@material-ui/core';
import { useStyles } from './RightsStyles';

interface RightsProps {
  className?: string;
}

// TODO: add intl translation

export const Rights = ({ className = '' }: RightsProps) => {
  const classes = useStyles();

  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      className={classes.container}
    >
      © 2021 Ankr All rights reserved | info@ankr.com
    </Typography>
  );
};
