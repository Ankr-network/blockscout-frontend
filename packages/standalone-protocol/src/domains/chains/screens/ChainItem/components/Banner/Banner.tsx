import classNames from 'classnames';
import { ChainId } from 'domains/chains/api/chain';
import { tHTML } from 'modules/i18n/utils/intl';
import React from 'react';
import { useBannerStyles } from './useBannerStyles';

interface BannerProps {
  chainId?: ChainId | string;
}

export const Banner = ({ chainId }: BannerProps) => {
  const classes = useBannerStyles();
  return (
    <div className={classNames(classes.root, chainId)}>
      <div className={classes.content}>
        {tHTML('chain-item.rate-limit-banner')}
      </div>
    </div>
  );
};
