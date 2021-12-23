import React from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';
import { Box, Container, Link, Typography } from '@material-ui/core';
import { HomeLogo } from '../../HomeLogo/HomeLogo';
import { FOOTER_PRIVACY_ITEMS } from '../links';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { usePrivacyStyles } from './usePrivacyStyles';

export const Privacy = ({ className }: { className?: string }) => {
  const classes = usePrivacyStyles();

  const year = new Date().getFullYear();

  return (
    <div className={classNames(classes.component, className)}>
      <Container className={classes.wrapper}>
        <Box className={classes.inner}>
          <HomeLogo className={classes.logo} />
          <Typography className={classes.copyright} component="p">
            {tHTML('copyright', { year })}
          </Typography>
          <ul className={classes.list}>
            {Object.values(FOOTER_PRIVACY_ITEMS).map(link => (
              <li className={classes.item} key={uid(link)}>
                <Link className={classes.link} href={link.link}>
                  {t(link.title)}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </div>
  );
};
