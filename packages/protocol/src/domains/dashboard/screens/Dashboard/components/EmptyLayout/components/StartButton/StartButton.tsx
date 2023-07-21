import { ArrowRightSmall } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { INDEX_PATH } from 'domains/chains/routes';

import { text } from '../../utils/text';
import { useStartButtonStyles } from './StartButtonStyles';

export const StartButton = () => {
  const { classes } = useStartButtonStyles();

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.endIcon,
      }}
      component={Link}
      endIcon={<ArrowRightSmall />}
      to={INDEX_PATH}
      variant="contained"
    >
      {text('button')}
    </Button>
  );
};
