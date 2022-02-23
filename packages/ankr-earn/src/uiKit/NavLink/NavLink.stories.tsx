import { makeStyles } from '@material-ui/core';

import { NavLink } from './NavLink';

const useStyles = makeStyles(theme => ({
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

const NavLinkStory = (): JSX.Element => {
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

        <NavLink className={classes.button} color="primary" href="#">
          Primary link
        </NavLink>

        <NavLink className={classes.button} color="secondary" href="#">
          Secondary link
        </NavLink>
      </div>
    </div>
  );
};

export const NavLinkExample = (): JSX.Element => <NavLinkStory />;

export default {
  title: 'UiKit/NavLink',
};
