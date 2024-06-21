import { Button } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';

import { useHelperLinkStyles } from './useHelperLinkStyles';

interface HelperLinkProps {
  className?: string;
  href: string;
  text: string;
}

export const HelperLink = ({ className, href, text }: HelperLinkProps) => {
  const { classes, cx } = useHelperLinkStyles();

  return (
    <Button
      className={cx(classes.helperLinkRoot, className)}
      href={href}
      target="_blank"
      endIcon={<ExternalLink className={classes.externalLinkIcon} />}
    >
      {text}
    </Button>
  );
};
