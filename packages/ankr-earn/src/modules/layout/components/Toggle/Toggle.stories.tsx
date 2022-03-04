import { makeStyles } from '@material-ui/core';

import { Toggle } from './Toggle';

const useStyles = makeStyles(() => ({
  block: {},
}));

const ToggleStory = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Toggle />
    </div>
  );
};

export const ToggleExample = (): JSX.Element => <ToggleStory />;

export default {
  title: 'modules/Layout/components/Toggle',
};
