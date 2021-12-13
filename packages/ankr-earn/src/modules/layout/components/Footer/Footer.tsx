import { SubNavigation } from '../SubNavigation';
import { Rights } from '../Rights';
import { Socials } from '../Socials';
import { useStyles } from './useFooterStyles';
import { FC } from 'react';

interface IFooter {
  className?: string;
}

export const Footer: FC<IFooter> = ({ className = '' }) => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <Rights className={classes.leftSide} />
      <SubNavigation className={classes.center} />
      <Socials className={classes.rightSide} />
    </footer>
  );
};
