import { NavigationLink } from 'modules/common/components/NavigationLink';
import { t } from 'modules/i18n/utils/intl';
import { useMainNavigationMobileStyles as useStyles } from './useMainNavigationMobileStyles';

export const MainNavigationMobile = () => {
  const classes = useStyles();

  const items = [
    {
      label: t('main-navigation.academy'),
      href: '/academy', // TODO: add proper route
    },
    {
      label: t('main-navigation.library'),
      href: '/library', // TODO: add proper route
    },
    {
      label: t('main-navigation.glossary'),
      href: '/glossary', // TODO: add proper route
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

  return <nav className={classes.root}>{renderedLinks}</nav>;
};
