import { forwardRef, LegacyRef } from 'react';
import classNames from 'classnames';

import { ChainId } from 'domains/chains/api/chain';
import { tHTML } from 'modules/i18n/utils/intl';
import { useBannerStyles } from './useBannerStyles';

interface BannerProps {
  chainId?: ChainId | string;
}

export const Banner = forwardRef(
  ({ chainId }: BannerProps, ref?: LegacyRef<HTMLDivElement>) => {
    const classes = useBannerStyles();

    return (
      <div className={classNames(classes.root, chainId)} ref={ref}>
        <div className={classes.content}>
          {tHTML('chain-item.rate-limit-banner')}
        </div>
      </div>
    );
  },
);
