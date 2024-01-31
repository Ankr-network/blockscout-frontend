import teamsLogo from 'domains/userSettings/assets/teams-logo.png';

import { useHeaderStyles } from './useHeaderStyles';

export const Header = () => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <img className={classes.logo} alt="Team logo" src={teamsLogo} />
    </div>
  );
};
