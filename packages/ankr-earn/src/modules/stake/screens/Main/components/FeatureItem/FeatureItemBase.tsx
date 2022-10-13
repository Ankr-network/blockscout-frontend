import { Box, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemBaseProps {
  title: string;
  iconRootClass?: string;
  iconSlot: JSX.Element;
  statsSlot: JSX.Element;
  buttonsSlot?: ReactNode;
  withAnimations?: boolean;
}

export const FeatureItemBase = ({
  title,
  statsSlot,
  iconRootClass,
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
          className: iconRootClass
            ? `${classes.icon} ${iconRootClass}`
            : classes.icon,
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
