import React from 'react';

import { Typography } from '@material-ui/core';
import { useTronAboutStyles } from './useTronAboutStyles';
import { t } from 'common';

const LEARN_MORE_LINK = 'https://tronprotocol.github.io/documentation-en/ ';

export const TronAbout = () => {
  const classes = useTronAboutStyles();

  return (
    <div className={classes.root}>
      <Typography component="div" variant="body2" className={classes.about}>
        {t('chain-item.about-tron.about')}
        <a
          href={LEARN_MORE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {t('chain-item.about-tron.learn-more')}
        </a>
      </Typography>
    </div>
  );
};
