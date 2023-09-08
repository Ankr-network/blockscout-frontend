import { Typography } from '@mui/material';

import { text } from '../../utils/text';
import { usePlaceholderStyles } from './PlaceholderStyles';

export const Placeholder = () => {
  const { classes } = usePlaceholderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{text('placeholder.title')}</div>
      <Typography variant="body2" className={classes.subtitle}>
        {text('placeholder.subtitle')}
      </Typography>
    </div>
  );
};
