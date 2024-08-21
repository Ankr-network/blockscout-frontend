import { Doc } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { Typography } from '@mui/material';

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
  isTextHidden?: boolean;
}

export const ChainDocsLink = ({
  className = '',
  id,
  isTextHidden = false,
  size = 'medium',
  variant = 'outlined',
}: ChainDocsLinkProps) => {
  const { classes } = useChainDocsLinkStyles();

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const link = useMemo(
    () =>
      getChainDocsLink(id, isChainProtocolSwitchEnabled, chainProtocol) || '',
    [id, isChainProtocolSwitchEnabled, chainProtocol],
  );

  if (!link) {
    return null;
  }

  return (
    <NavLink
      className={className}
      disabled={!link}
      href={link}
      startIcon={<Doc className={classes.icon} />}
      variant={variant}
      size={size}
      title={t('chain-item.header.docs')}
    >
      <Typography variant="button2">
        {!isTextHidden && t('chain-item.header.docs')}
      </Typography>
    </NavLink>
  );
};
