import { ReactNode, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import { useErrorStyles } from './useErrorStyles';

interface IErrorProps {
  title?: string;
  buttonText?: string;
  toLocation?: 'refresh' | string;
  description?: ReactNode;
  buttonHandler?: () => void;
}

export const Error = ({
  title,
  buttonText,
  description,
  buttonHandler,
  toLocation = 'refresh',
}: IErrorProps) => {
  const classes = useErrorStyles();
  const history = useHistory();

  const defaultHandler = useCallback(() => {
    if (!toLocation) return;

    if (toLocation === 'refresh') {
      window.location.reload();
    } else {
      history.push(toLocation);
    }
  }, [history, toLocation]);

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h4" className={classes.description}>
        {description}
      </Typography>
      <Button
        size="large"
        onClick={
          typeof buttonHandler === 'function' ? buttonHandler : defaultHandler
        }
      >
        {buttonText}
      </Button>
    </Box>
  );
};
