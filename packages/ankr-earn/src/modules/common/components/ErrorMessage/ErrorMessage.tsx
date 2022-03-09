import { Box, Paper, PaperProps, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';

import { useErrorMessageStyles } from './useErrorMessageStyles';

interface IErrorMessageProps extends PaperProps {
  title?: string;
  text?: string;
  onClick?: () => void;
  btnText?: string;
  isLoading?: boolean;
}

export const ErrorMessage = ({
  className,
  title,
  text,
  btnText,
  onClick,
  children,
  isLoading = false,
  ...restProps
}: IErrorMessageProps): JSX.Element => {
  const classes = useErrorMessageStyles();

  return (
    <Paper className={classNames(classes.root, className)} {...restProps}>
      {title && (
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
      )}

      {text && <Typography>{text}</Typography>}

      {children}

      {typeof onClick === 'function' && (
        <Box mt={4}>
          <Button
            color="primary"
            disabled={isLoading}
            isLoading={isLoading}
            size="large"
            variant="contained"
            onClick={onClick}
          >
            {btnText || t('error.btn')}
          </Button>
        </Box>
      )}
    </Paper>
  );
};
