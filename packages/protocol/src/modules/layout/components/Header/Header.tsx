import { Container } from '@mui/material';

import { NoReactSnap } from 'uiKit/NoReactSnap';

import { Breadcrumbs } from '../Breadcrumbs';
import { HeaderContent } from './components/HeaderContent';
import { useStyles } from './useStyles';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

interface HeaderProps {
  className?: string;
  isChainItemPage?: boolean;
}

export const Header = ({ className = '', isChainItemPage }: HeaderProps) => {
  const bannerHeight = useHeaderBannerHeight();
  const { classes, cx } = useStyles(bannerHeight);

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs isChainItemPage={isChainItemPage} />
        <div className={classes.right}>
          <NoReactSnap>
            <div className={classes.buttons}>
              <HeaderContent />
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
