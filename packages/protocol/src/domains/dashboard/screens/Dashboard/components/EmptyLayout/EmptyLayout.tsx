import { Box } from '@mui/material';

import { StartButton } from './components/StartButton';
import { text } from './utils/text';
import { useEmptyLayoutStyles } from './EmptyLayoutStyles';
import image from './assets/launch.png';

export const EmptyLayout = () => {
  const { classes } = useEmptyLayoutStyles();

  return (
    <Box className={classes.root}>
      <img alt="Launch" className={classes.image} src={image} />
      <div className={classes.title}>{text('title')}</div>
      <div className={classes.description}>{text('description')}</div>
      <StartButton />
    </Box>
  );
};
