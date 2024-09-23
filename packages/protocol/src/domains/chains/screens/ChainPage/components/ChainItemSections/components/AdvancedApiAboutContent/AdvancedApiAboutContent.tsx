import { Link, Typography } from '@mui/material';

import { AAPI_ABOUT_LINK } from 'modules/common/constants/const';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { advancedApiApiAboutContent } from './translation';
import { useAdvancedApiAboutContentStyles } from './useAdvancedApiAboutContentStyles';

export const AdvancedApiAboutContent = () => {
  const { classes } = useAdvancedApiAboutContentStyles();

  const { keys, t } = useTranslation(advancedApiApiAboutContent);

  return (
    <div className={classes.advancedApiAboutSection}>
      <Typography variant="body2">{t(keys.about)}</Typography>
      <Link
        target="_blank"
        variant="body3"
        className={classes.advancedApiLearnMoreLink}
        href={AAPI_ABOUT_LINK}
      >
        {t(keys.learnMore)}
      </Link>
    </div>
  );
};
