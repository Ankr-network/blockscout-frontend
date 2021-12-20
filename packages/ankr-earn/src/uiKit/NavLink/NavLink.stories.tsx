import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { NavLink } from './NavLink';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    '& hr': {
      display: 'block',
      margin: '16px 0',
      borderColor: theme.palette.text.secondary,
    },
  },

  content: {
    marginTop: 16,
  },

  button: {
    marginRight: 16,
  },
}));

const NavLinkStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <div className={classes.content}>
        <NavLink className={classes.button} href="#">
          Navigation link
        </NavLink>
        <NavLink className={classes.button} href="https://www.ankr.com/">
          External link
        </NavLink>
      </div>
      <hr />
      Color
      <div className={classes.content}>
        <NavLink className={classes.button} href="#">
          Default link
        </NavLink>
        <NavLink className={classes.button} href="#" color="primary">
          Primary link
        </NavLink>
        <NavLink className={classes.button} href="#" color="secondary">
          Secondary link
        </NavLink>
      </div>
    </div>
  );
};

export const NavLinkExample = () => <NavLinkStory />;

export default {
  title: 'UiKit/NavLink',
};
