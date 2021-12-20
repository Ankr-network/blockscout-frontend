import { NavigationLink } from 'modules/common/components/NavigationLink';
import { t } from 'modules/i18n/utils/intl';
import { LocaleSwitcherMobile } from '../LocaleSwitcherMobile';
import { useMainNavigationMobileStyles as useStyles } from './useMainNavigationMobileStyles';

export const MainNavigationMobile = () => {
  const classes = useStyles();

  const items = [
    {
      label: t('main-navigation.stake'),
      href: '1', // TODO: add proper route
    },
    {
      label: t('main-navigation.dashboard'),
      href: '2', // TODO: add proper route
    },
    {
      label: t('main-navigation.parachain'),
      href: '3', // TODO: add proper route
    },
    {
      label: t('main-navigation.boost'),
      href: '4', // TODO: add proper route
    },
    {
      label: t('main-navigation.docs'),
      href: '6', // TODO: add proper route
    },
    {
      label: t('main-navigation.litepaper'),
      href: '7', // TODO: add proper route
    },
  ];

  const renderedLinks = items.map(item => (
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
