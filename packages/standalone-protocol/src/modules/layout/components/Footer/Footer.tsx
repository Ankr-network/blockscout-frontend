import React, { Fragment, useMemo } from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import { visitMainSiteEvent } from 'modules/analytics/trackMixpanel';
import { ReactComponent as HeartIcon } from './heart.svg';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ANKR_WEBSITE_URL } from 'Routes';
import { getLinksList } from './FooterUtils';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const classes = useStyles();

  const links = useMemo(() => getLinksList(chainId), [chainId]);

  return (
    <footer
      className={classNames(classes.root, className, chainId)}
      data-test-id="footer"
    >
      <div className={classes.content}>
        <Typography variant="body2" className={classes.rootText}>
          {t('footer.supported')} <HeartIcon className={classes.heart} />{' '}
          {t('footer.by')}{' '}
          <a
            href={ANKR_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            onClick={visitMainSiteEvent}
          >
            {t('footer.ankr')}
          </a>
        </Typography>
        <br />
        <div className={classNames(classes.links, chainId)}>
          <Typography variant="body2">
            {t('footer.other-text')}{' '}
            {links.map(({ href, event, text }, index) => {
              return (
                <Fragment key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                    onClick={event}
                  >
                    {t(text)}
                  </a>
                  {index === 0 && ', '}
                  {index === 1 && t('footer.and')}
                </Fragment>
              );
            })}
            !
          </Typography>
        </div>
      </div>
    </footer>
  );
};
