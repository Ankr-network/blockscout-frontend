import React from 'react';
import { Typography, Button } from '@material-ui/core';
import classNames from 'classnames';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { useStyles } from './StakingInfoStyles';
import CubeImg from './assets/cube.png';

const WAITLIST_LINK = 'https://ankrnetwork.typeform.com/nodeprovider';

interface StakingInfoProps {
  className?: string;
}

export const StakingInfo = ({ className = '' }: StakingInfoProps) => {
  const classes = useStyles();

  const handleBannerClick = () => {
    window.open(WAITLIST_LINK, '_blank')?.focus();
  };

  return (
    <div
      onClick={handleBannerClick}
      role="button"
      tabIndex={0}
      className={classNames(classes.root, className)}
    >
      <div className={classes.image}>
        <img src={CubeImg} alt={t('staking-info.alt')} />
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
