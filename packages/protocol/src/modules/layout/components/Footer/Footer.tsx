import { Divider, Link, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  ANKR_PRIVACY_POLICY_LINK,
  ANKR_TERMS_OF_SERVICE_LINK,
} from 'modules/common/constants/const';

import { ReactComponent as AnkrLogo } from '../../assets/ankr.svg';
import { useFooterStyles } from './useFooterStyles';

export const Footer = () => {
  const { classes, cx } = useFooterStyles();

  return (
    <div className={classes.root}>
      <div className={cx(classes.item, classes.docs)}>
        <AnkrLogo className={classes.logo} />
        <Typography
          className={classes.copyRightsLink}
          variant="body3"
          color="textSecondary"
        >
          {t('footer.all-rights', {
            year: new Date().getFullYear(),
          })}
        </Typography>
        <Divider orientation="vertical" className={classes.divider} />
        <Link
          className={cx(classes.link, classes.termsLink)}
          href={ANKR_TERMS_OF_SERVICE_LINK}
          target="_blank"
          variant="body3"
          color="textSecondary"
        >
          {t('footer.terms')}
        </Link>
        <Link
          className={cx(classes.link, classes.privacyLink)}
          href={ANKR_PRIVACY_POLICY_LINK}
          target="_blank"
          variant="body3"
          color="textSecondary"
        >
          {t('footer.privacy')}
        </Link>
      </div>
    </div>
  );
};
