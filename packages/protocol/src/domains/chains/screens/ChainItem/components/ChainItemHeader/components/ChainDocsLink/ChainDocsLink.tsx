import { Button } from '@mui/material';
import { Doc } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Chain } from 'domains/chains/types';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

import { getChainDocsLink } from '../../utils/getChainDocsLink';
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
  const { classes, cx } = useChainDocsLinkStyles();

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const link = getChainDocsLink(
    id,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  );

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
