import React, { useCallback } from 'react';
import { TypographyTypeMap, Typography } from '@mui/material';
import { useRPCInfoFunStyle } from './useRPCInfoFunStyle';
import { MetaMaskWallet } from '@ankr.com/ui';
import { useAddNetworkButton } from 'domains/auth/components/AddNetwork/useAddNetworkButton';
import { Chain } from 'domains/chains/types';
import { useAuth } from 'domains/auth/hooks/useAuth';

interface IPRCInfoFunProps {
  size?: 'm' | 'l';
  info: string;
  chain: Chain;
  textColor?: TypographyTypeMap['props']['color'];
}

export const RPCInfoFun = ({
  info,
  size = 'm',
  textColor = 'textSecondary',
  chain,
}: IPRCInfoFunProps) => {
  const { classes } = useRPCInfoFunStyle(size);
  const { loading } = useAuth();

  const handleButtonClick = useAddNetworkButton({
    chain,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!loading && handleButtonClick) {
        handleButtonClick(event);
      }
    },
    [loading, handleButtonClick],
  );

  if (!handleButtonClick) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      /* stop propagation for click event to avoid parent element click */
      onClick={handleClick}
      className={classes.root}
    >
      <Typography
        variant="body2"
        noWrap
        className={classes.text}
        color={textColor}
      >
        {info}
      </Typography>
      <MetaMaskWallet />
    </div>
  );
};
