import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useHasAnkrsInfo } from 'domains/chains/screens/ChainItem/ChainItemUtils';
import { Banner } from 'domains/chains/screens/ChainItem/components/Banner';
import { useDimensions } from 'modules/common/hooks/useDimensions';
import { renderChainName } from 'modules/common/types/unit';
import { tHTML } from 'modules/i18n/utils/intl';
import { MutableRefObject, useRef } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderProps } from './HeaderProps';
import { useStyles } from './HeaderStyles';

export const Header = ({ chainId, className = '' }: HeaderProps) => {
  const bannerRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const { height: bannerHeight } = useDimensions(bannerRef);
  const hasInfo = useHasAnkrsInfo(chainId);

  const classes = useStyles({ chainId, bannerHeight, hasInfo });

  return (
    <div className={classNames(classes.root, className)} data-test-id="header">
      <Banner chainId={chainId} ref={bannerRef} />
      <HeaderLogo chainId={chainId} hasInfo={hasInfo} />
      <Typography className={classNames(classes.title, chainId)} variant="h1">
        {tHTML('chain-item.header.title', { name: renderChainName(chainId) })}
      </Typography>

      <Typography
        className={classNames(classes.description, chainId)}
        variant="h3"
        color="textPrimary"
      >
        {tHTML('chain-item.header.description')}
      </Typography>
    </div>
  );
};
