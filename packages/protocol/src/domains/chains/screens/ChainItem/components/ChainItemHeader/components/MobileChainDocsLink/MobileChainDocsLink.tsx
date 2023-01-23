import { Button } from '@mui/material';

import { ExternalLink } from '@ankr.com/ui';
import { getChainDocsLink } from '../../utils/getChainDocsLink';
import { t } from '@ankr.com/common';
import { useMobileChainDocsLinkStyles } from './MobileChainDocsLinkStyles';

export interface MobileChainDocsLinkProps {
  chainId: string;
}

export const MobileChainDocsLink = ({ chainId }: MobileChainDocsLinkProps) => {
  const link = getChainDocsLink(chainId);

  const { classes } = useMobileChainDocsLinkStyles();

  return (
    <Button
      className={classes.button}
      disabled={!link}
      href={link || ''}
      endIcon={<ExternalLink />}
      target="_blank"
      variant="text"
    >
      {t('chain-item.header.docs')}
    </Button>
  );
};
