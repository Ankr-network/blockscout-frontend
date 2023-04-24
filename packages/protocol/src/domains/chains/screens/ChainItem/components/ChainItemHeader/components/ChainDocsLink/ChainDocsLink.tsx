import { Button } from '@mui/material';

import { Chain } from 'domains/chains/types';
import { Doc } from '@ankr.com/ui';
import { getChainDocsLink } from '../../utils/getChainDocsLink';
import { t } from '@ankr.com/common';
import { useChainDocsLinkStyles } from './ChainDocsLinkStyles';

export interface ChainDocsLinkProps {
  chain: Chain;
  className?: string;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

export const ChainDocsLink = ({
  chain: { id },
  className,
  variant = 'outlined',
  size = 'medium',
}: ChainDocsLinkProps) => {
  const link = getChainDocsLink(id);

  const { classes, cx } = useChainDocsLinkStyles();

  return (
    <Button
      className={cx(classes.button, className)}
      classes={{
        iconSizeMedium: classes.iconSize,
      }}
      disabled={!link}
      href={link || ''}
      startIcon={<Doc />}
      target="_blank"
      variant={variant}
      size={size}
    >
      {t('chain-item.header.docs')}
    </Button>
  );
};
