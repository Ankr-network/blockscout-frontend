import React, { useCallback } from 'react';
import { TypographyTypeMap, Typography } from '@material-ui/core';
import { useRPCInfoFunStyle } from './useRPCInfoFunStyle';
import { ReactComponent as MetamaskIcon } from 'assets/img/metamask.svg';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { useAddNetworkButton } from 'domains/auth/components/AddNetwork/useAddNetworkButton';
import { IApiChain } from 'domains/chains/api/queryChains';

interface IPRCInfoFunProps {
  size?: 'm' | 'l';
  info: string;
  publicChain: Chain;
  textColor?: TypographyTypeMap['props']['color'];
}

export const RPCInfoFun = ({
  info,
  size = 'm',
  textColor = 'textSecondary',
  publicChain,
}: IPRCInfoFunProps) => {
  const classes = useRPCInfoFunStyle({ size });

  const { handleButtonClick, loading } = useAddNetworkButton({
    publicChain: publicChain as IApiChain,
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

  return (
    <>
      {handleButtonClick && (
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
          <MetamaskIcon />
        </div>
      )}
    </>
  );
};
