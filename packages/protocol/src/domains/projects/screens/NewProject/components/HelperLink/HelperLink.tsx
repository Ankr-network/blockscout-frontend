import { Button } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';

import { useHelperLinkStyles } from './useHelperLinkStyles';

interface HelperLinkProps {
  text: string;
  href: string;
}

export const HelperLink = ({ text, href }: HelperLinkProps) => {
  const { classes } = useHelperLinkStyles();

  return (
    <Button
      className={classes.helperLinkRoot}
      href={href}
      target="_blank"
      endIcon={<ExternalLink className={classes.externalLinkIcon} />}
    >
      {text}
    </Button>
  );
};
