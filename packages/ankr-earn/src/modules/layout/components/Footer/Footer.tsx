import { SubNavigation } from '../SubNavigation';
import { Rights } from '../Rights';
import { Socials } from '../Socials';
import { useFooterStyles as useStyles } from './useFooterStyles';
import { Container } from '@material-ui/core';

interface IFooter {
  className?: string;
}

export const Footer = ({ className = '' }: IFooter) => {
  const classes = useStyles();

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
