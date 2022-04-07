import { Grid, Typography } from '@material-ui/core';
import { ForwardRefExoticComponent, MemoExoticComponent } from 'react';

import { Token } from 'modules/common/types/token';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';

import { NetworkIconTextSkeleton } from './NetworkIconTextSkeleton';
import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

type TIconMap = Record<
  | Token.aAVAXb
  | Token.aBNBb
  | Token.aBNBc
  | Token.aETHb
  | Token.aETHc
  | Token.aFTMb
  | Token.aMATICb,
  MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>>
>;

const iconByTokenMap: TIconMap = {
  [Token.aAVAXb]: AAvaxBIcon,
  [Token.aBNBb]: ABNBBIcon,
  [Token.aBNBc]: ABNBCIcon,
  [Token.aETHb]: AETHBIcon,
  [Token.aETHc]: AETHCIcon,
  [Token.aFTMb]: AFTMBIcon,
  [Token.aMATICb]: AMATICBIcon,
};

interface INetworkIconTextProps {
  token?: Token;
  network?: string;
  isLoading?: boolean;
  contract?: string;
}

export const NetworkIconText = ({
  token,
  network,
  isLoading,
  contract,
}: INetworkIconTextProps): JSX.Element => {
  const classes = useNetworkIconTextStyles();

  if (isLoading) {
    return <NetworkIconTextSkeleton />;
  }

  const Icon = iconByTokenMap[token as keyof TIconMap];

  const TokenSymbol = (
    <Typography className={classes.token}>{token}</Typography>
  );

  const ContractCopyTooltip = contract && TokenSymbol;

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Icon className={classes.icon} />
      </Grid>

      <Grid item>
        {ContractCopyTooltip || TokenSymbol}

        <Typography className={classes.network}>{network}</Typography>
      </Grid>
    </Grid>
  );
};
