import { t } from '@ankr.com/common';
import { DOC_URL } from 'modules/layout/components/MainNavigation/utils/navigationUtils';
import { NavLink } from 'uiKit/NavLink';
import { intlRoot } from '../FeatureTable/FeatureTableUtils';
import { ExternalLink } from '@ankr.com/ui';
import { useFeatureTableStyles } from '../FeatureTable/useFeatureTableStyles';

export const LearnMore = () => {
  const { classes } = useFeatureTableStyles();

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
        <ExternalLink />
      </NavLink>
    </>
  );
};
