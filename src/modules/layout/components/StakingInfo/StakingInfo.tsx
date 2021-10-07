import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { useStyles } from './StakingInfoStyles';
import CubeImg from './assets/cube.png';

const WAITLIST_LINK = 'https://test.com';

export const StakingInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <img src={CubeImg} alt="" />
      </div>
      <Typography variant="body2" className={classes.text}>
        {tHTML('staking-info.description')}
      </Typography>
      <Button
        component="a"
        target="_blank"
        variant="text"
        href={WAITLIST_LINK}
        className={classes.link}
        endIcon={<ArrowRightIcon className={classes.icon} />}
      >
        {t('staking-info.link')}
      </Button>
    </div>
  );
};
