import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import {
  visitMainSiteEvent,
  visitOtherProjectEvent,
} from 'modules/analytics/trackMixpanel';
import { ReactComponent as HeartIcon } from './heart.svg';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ANKR_WEBSITE_URL } from 'Routes';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const classes = useStyles();

  return (
    <footer
      className={classNames(classes.root, className)}
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
            <a
              href="https://polygon-rpc.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
              onClick={() => visitOtherProjectEvent('Polygon')}
            >
              {t('footer.polygon')}
            </a>
            ,{' '}
            <a
              href="https://rpc.ftm.tools"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
              onClick={() => visitOtherProjectEvent('Fantom')}
            >
              {t('footer.fantom')}
            </a>
            {t('footer.and')}
            <a
              href="https://bscrpc.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
              onClick={() => visitOtherProjectEvent('BSC')}
            >
              {t('footer.bsc')}
            </a>
            !
          </Typography>
        </div>
      </div>
    </footer>
  );
};
