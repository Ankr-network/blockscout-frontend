import { Button } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';

import { useCardLinkStyles } from './CardLinkStyles';

export interface CardLinkProps {
  address: string;
  text: string;
}

export const CardLink = ({ address, text }: CardLinkProps) => {
  const { classes } = useCardLinkStyles();

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.iconWrapper,
      }}
      color="primary"
      endIcon={<ExternalLink className={classes.icon} />}
      href={address}
      target="_blank"
      variant="text"
    >
      {text}
    </Button>
  );
};
