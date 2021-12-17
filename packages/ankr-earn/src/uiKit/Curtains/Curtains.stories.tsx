import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Curtains } from './Curtains';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    display: 'grid',

    width: '100%',
    minHeight: '50vh',
  },

  wrapper: {
    width: '100%',
    height: '100%',
  },
}));

const CurtainsStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Curtains className={classes.content}>
        <div
          style={{
            width: '100%',
            height: '100%',
            boxShadow: '0 0 0 1px #FFB800',
          }}
        />
      </Curtains>
    </div>
  );
};

export const CurtainsExample = () => <CurtainsStory />;

export default {
  title: 'UiKit/Curtains',
};
