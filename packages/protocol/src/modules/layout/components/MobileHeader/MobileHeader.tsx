import { Container } from '@mui/material';

import { Logo } from '../Logo';
import { HeaderContent } from '../Header/components/HeaderContent';
import { MobileMenu } from '../MobileMenu';
import { useStyles } from './useStyles';

interface MobileHeaderProps {
  className?: string;
  chainsRoutes: string[];
  isLoggedIn: boolean;
  loading: boolean;
}

export const MobileHeader = ({
  className = '',
  chainsRoutes,
  isLoggedIn,
  loading,
}: MobileHeaderProps) => {
  const { classes, cx } = useStyles();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          <HeaderContent isMobile />
          <MobileMenu
            chainsRoutes={chainsRoutes}
            isLoggedIn={isLoggedIn}
            loading={loading}
            hasLogo={false}
          />
        </div>
      </Container>
    </header>
  );
};
