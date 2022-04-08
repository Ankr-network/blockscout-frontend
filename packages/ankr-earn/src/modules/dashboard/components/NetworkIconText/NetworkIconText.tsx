import { Grid, Typography } from '@material-ui/core';
import { ForwardRefExoticComponent, MemoExoticComponent } from 'react';

import { BlockchainNetworkId } from 'provider';

import { Token } from 'modules/common/types/token';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { ADOTBIcon } from 'uiKit/Icons/ADOTBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AKSMBIcon } from 'uiKit/Icons/AKSMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';

import { NetworkIconTextSkeleton } from './NetworkIconTextSkeleton';
import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

type TIconMap = Record<
  | Token.aAVAXb
  | Token.aBNBb
  | Token.aBNBc
  | Token.aDOTb
  | Token.aETHb
  | Token.aETHc
  | Token.aFTMb
  | Token.aKSMb
  | Token.aMATICb
  | Token.aWNDb
  | Token.DOT
  | Token.KSM
  | Token.WND,
  MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>>
>;

type TNetworkIconMap = {
  [chainID in BlockchainNetworkId]?: MemoExoticComponent<
    ForwardRefExoticComponent<ISvgIconProps>
  >;
};

const iconByTokenMap: TIconMap = {
  [Token.aAVAXb]: AAvaxBIcon,
  [Token.aBNBb]: ABNBBIcon,
  [Token.aBNBc]: ABNBCIcon,
  [Token.aDOTb]: ADOTBIcon,
  [Token.aETHb]: AETHBIcon,
  [Token.aETHc]: AETHCIcon,
  [Token.aFTMb]: AFTMBIcon,
  [Token.aKSMb]: AKSMBIcon,
  [Token.aMATICb]: AMATICBIcon,
  [Token.aWNDb]: ADOTBIcon,
  [Token.DOT]: DotIcon,
  [Token.KSM]: KsmIcon,
  [Token.WND]: DotIcon,
};

const iconByNetworkMap: TNetworkIconMap = {
  1: EthIcon,
  5: EthIcon,
  56: BNBIcon,
  97: BNBIcon,
  43114: AvaxIcon,
  43113: AvaxIcon,
  137: MaticIcon,
  250: FantomIcon,
  4002: FantomIcon,
  80001: MaticIcon,
};

interface INetworkIconTextProps {
  chainId?: BlockchainNetworkId;
  contract?: string;
  isLoading?: boolean;
  network?: string;
  token?: Token;
}

export const NetworkIconText = ({
  chainId,
  contract,
  isLoading,
  network,
  token,
}: INetworkIconTextProps): JSX.Element => {
  const classes = useNetworkIconTextStyles();

  if (isLoading) {
    return <NetworkIconTextSkeleton />;
  }

  const Icon = iconByTokenMap[token as keyof TIconMap];
  const NetworkIcon = chainId && iconByNetworkMap[chainId];

  const TokenSymbol = (
    <Typography className={classes.token}>{token}</Typography>
  );

  const ContractCopyTooltip = contract && TokenSymbol;

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.iconContainer}>
        <Icon className={classes.icon} />

        {NetworkIcon ? <NetworkIcon className={classes.networkIcon} /> : null}
      </Grid>

      <Grid item>
        {ContractCopyTooltip || TokenSymbol}

        <Typography className={classes.network}>{network}</Typography>
      </Grid>
    </Grid>
  );
};
