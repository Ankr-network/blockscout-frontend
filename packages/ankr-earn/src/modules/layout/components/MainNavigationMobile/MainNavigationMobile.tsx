import { NavigationLink } from 'modules/common/components/NavigationLink';
import { useNavigationItems } from 'modules/layout/hooks/useNavigationItems';
import { LocaleSwitcherMobile } from '../LocaleSwitcherMobile';
import { useMainNavigationMobileStyles as useStyles } from './useMainNavigationMobileStyles';

export const MainNavigationMobile = () => {
  const classes = useStyles();
  const { mobileItems } = useNavigationItems();

  const renderedLinks = mobileItems.map(item => (
    <div key={item.label} className={classes.linkWrapper}>
      <NavigationLink
        label={item.label}
        href={item.href}
        className={classes.link}
      />
    </div>
  ));

  return (
    <nav className={classes.root}>
      {renderedLinks}
      <LocaleSwitcherMobile />
    </nav>
  );
};
