import { Box, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemBaseProps {
  title: string;
  iconSlot: JSX.Element;
  statsSlot: JSX.Element;
  buttonsSlot?: ReactNode;
  withAnimations?: boolean;
}

export const FeatureItemBase = ({
  title,
  statsSlot,
  iconSlot,
  buttonsSlot,
  withAnimations,
}: IFeatureItemBaseProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  return (
    <Paper
      className={classNames(
        classes.root,
        withAnimations && classes.rootWithAnimations,
      )}
    >
      <Box mb={1.5}>
        {React.cloneElement(iconSlot, {
          className: classes.icon,
        })}
      </Box>

      <Box mb={1.5}>
        <Typography className={classes.title}>{title}</Typography>
      </Box>

      <Box className={classes.stats}>{statsSlot}</Box>

      {buttonsSlot && <div className={classes.buttons}>{buttonsSlot}</div>}
    </Paper>
  );
};
