import { Container } from '@material-ui/core';
import { Rights } from '../Rights';
import { Socials } from '../Socials';
import { SubNavigation } from '../SubNavigation';
import { useFooterStyles } from './useFooterStyles';

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <footer>
      <Container className={classes.container}>
        <Rights className={classes.leftSide} />
        <SubNavigation className={classes.center} />
        <Socials className={classes.rightSide} />
      </Container>
    </footer>
  );
};
