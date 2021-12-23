import React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Toggle } from './Toggle';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const ToggleStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Toggle />
    </div>
  );
};

export const ToggleExample = () => <ToggleStory />;

export default {
  title: 'modules/Layout/components/Toggle',
};
