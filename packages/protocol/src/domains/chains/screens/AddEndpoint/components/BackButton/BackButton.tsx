import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { AngleRightIcon } from 'uiKit/Icons/AngleRightIcon';
import { useStyles } from './BackButtonStyles';
import { BackButtonProps } from './BackButtonTypes';

export const BackButton = ({ title, className }: BackButtonProps) => {
  const { classes, cx } = useStyles();
  const history = useHistory();

  const onClick = useCallback(() => history.goBack(), [history]);

  return (
    <div className={cx(classes.root, className)}>
      <Button variant="text" className={classes.link} onClick={onClick}>
        <AngleRightIcon className={classes.backButton} />
      </Button>
      {title && (
        <Typography color="textPrimary" variant="h3" className={classes.text}>
          {title}
        </Typography>
      )}
    </div>
  );
};
