import { t } from 'modules/i18n/utils/intl';
import { DOC_URL } from 'modules/layout/components/MainNavigation/MainNavigationUtils';
import { NavLink } from 'ui';
import { intlRoot } from '../FeatureTable/FeatureTableUtils';
import { ReactComponent as LinkIcon } from 'uiKit/Icons/open-link.svg';
import { useFeatureTableStyles } from '../FeatureTable/useFeatureTableStyles';

export const LearnMore = () => {
  const classes = useFeatureTableStyles();

  return (
    <>
      <em>{t(`${intlRoot}.to-learn-more`)}</em>
      <NavLink
        href={DOC_URL}
        className={classes.link}
        variant="text"
        color="inherit"
      >
        {t(`${intlRoot}.ankr-doc`)}
        <LinkIcon />
      </NavLink>
    </>
  );
};
