import { Container } from '@mui/material';

import { AccountStatus } from 'modules/common/components/AccountStatus';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { Header } from 'modules/layout/const';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { HeaderContent } from '../Header/components/HeaderContent';
import { MobileMenu } from '../MobileMenu';
import { useStyles } from './useStyles';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className }: MobileHeaderProps) => {
  const bannerHeight = useHeaderBannerHeight();
  const { classes, cx } = useStyles(bannerHeight);

  const isXsDown = useIsXSDown();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <GlobalMenuWrapper />
        {!isXsDown && <AccountStatus className={classes.accountStatus} />}
        <div className={classes.buttons}>
          <HeaderContent type={Header.Mobile} />
          <MobileMenu hasMenu={false} />
        </div>
      </Container>
    </header>
  );
};
