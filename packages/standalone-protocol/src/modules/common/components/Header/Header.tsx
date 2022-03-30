import React, { MutableRefObject, useRef } from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';
import { HeaderProps } from './HeaderProps';
import {
  getBannerContent,
  hasBanner,
} from 'domains/chains/screens/ChainItem/ChainItemUtils';
import { useDimensions } from 'modules/common/hooks/useDimensions';

export const Header = ({ chainId, className = '' }: HeaderProps) => {
  const bannerRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const { height: bannerHeight } = useDimensions(bannerRef);
  const classes = useStyles({ chainId, bannerHeight });

  return (
    <div className={classNames(classes.root, className)}>
      {hasBanner(chainId) && (
        <div ref={bannerRef} className={classNames(classes.banner, chainId)}>
          {getBannerContent(chainId)}
        </div>
      )}

      <Typography className={classNames(classes.title, chainId)} variant="h1">
        {tHTML('chain-item.header.title', { name: chainId })}
      </Typography>

      <Typography
        className={classNames(classes.description, chainId)}
        variant="h3"
        color="textPrimary"
      >
        {tHTML('chain-item.header.description', { network: chainId })}
      </Typography>
    </div>
  );
};
