import { ReactNode, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useErrorStyles } from './useErrorStyles';

interface IErrorProps {
  title?: string;
  buttonText?: string;
  toLocation?: 'refresh' | string;
  hasLayout?: boolean;
  description?: ReactNode;
  buttonHandler?: () => void;
}

export const Error = ({
  title,
  buttonText,
  description,
  buttonHandler,
  toLocation = 'refresh',
  hasLayout = true,
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

  const content = useMemo(() => {
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
  }, [
    buttonHandler,
    buttonText,
    classes.description,
    classes.root,
    classes.title,
    defaultHandler,
    description,
    title,
  ]);

  if (hasLayout) {
    return <DefaultLayout hasError>{content}</DefaultLayout>;
  }

  return <>{content}</>;
};
