import { Doc } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChainID } from 'modules/chains/types';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { NavLink } from 'uiKit/NavLink';

import { getChainDocsLink } from '../../utils/getChainDocsLink';
import { useChainDocsLinkStyles } from './ChainDocsLinkStyles';

export interface ChainDocsLinkProps {
  id: ChainID;
  className?: string;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

export const ChainDocsLink = ({
  id,
  className = '',
  variant = 'outlined',
  size = 'medium',
}: ChainDocsLinkProps) => {
  const { classes } = useChainDocsLinkStyles();

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const link = useMemo(
    () =>
      getChainDocsLink(id, isChainProtocolSwitchEnabled, chainProtocol) || '',
    [id, isChainProtocolSwitchEnabled, chainProtocol],
  );

  return (
    <NavLink
      className={className}
      disabled={!link}
      href={link}
      startIcon={<Doc className={classes.icon} />}
      variant={variant}
      size={size}
    >
      {t('chain-item.header.docs')}
    </NavLink>
  );
};
