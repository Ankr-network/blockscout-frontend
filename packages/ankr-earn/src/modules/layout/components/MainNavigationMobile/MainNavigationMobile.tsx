import { NavigationLink } from 'modules/common/components/NavigationLink';
import { featuresConfig } from 'modules/common/const';
import { useNavigationItems } from 'modules/layout/hooks/useNavigationItems';

import { LocaleSwitcherMobile } from '../LocaleSwitcherMobile';

import { useMainNavigationMobileStyles as useStyles } from './useMainNavigationMobileStyles';

export const MainNavigationMobile = (): JSX.Element => {
  const classes = useStyles();
  const { mobileItems } = useNavigationItems();

  const renderedLinks = mobileItems.map(item => (
    <div key={item.label} className={classes.linkWrapper}>
      <NavigationLink
        className={classes.link}
        href={item.href}
        label={item.label}
      />
    </div>
  ));

  return (
    <nav className={classes.root}>
      {renderedLinks}

      {featuresConfig.localeSwitcher && <LocaleSwitcherMobile />}
    </nav>
  );
};
