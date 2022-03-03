import { Grid, Typography } from '@material-ui/core';
import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  useEffect,
  useState,
} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';
import { TextButton } from 'uiKit/TextButton';
import { Tooltip } from 'uiKit/Tooltip';

import { ReactComponent as Checkmark } from './assets/checkmark.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import { NetworkIconTextSkeleton } from './NetworkIconTextSkeleton';
import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

type TIconMap = Record<
  | Token.aAVAXb
  | Token.aBNBb
  | Token.aETHb
  | Token.aETHc
  | Token.aFTMb
  | Token.aMATICb,
  MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>>
>;

const iconByTokenMap: TIconMap = {
  [Token.aAVAXb]: AvaxIcon,
  [Token.aBNBb]: BNBIcon,
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
  const [copiedTooltipOpen, setCopiedTooltipOpen] = useState(false);

  useEffect(() => {
    if (!copiedTooltipOpen) return;

    setTimeout(() => {
      setCopiedTooltipOpen(false);
    }, 1500);
  }, [copiedTooltipOpen]);

  const handleCopiedOpen = () => setCopiedTooltipOpen(true);
  const handleCopiedClose = () => setCopiedTooltipOpen(false);

  if (isLoading) {
    return <NetworkIconTextSkeleton />;
  }

  const Icon = iconByTokenMap[token as keyof TIconMap];

  const TokenSymbol = (
    <Typography className={classes.token}>{token}</Typography>
  );

  const ContractCopyTooltip = contract && (
    <Tooltip
      interactive
      title={
        <Tooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={copiedTooltipOpen}
          title={
            <div className={classes.copied}>
              <Checkmark />

              {t('dashboard.copied')}
            </div>
          }
          onClose={handleCopiedClose}
        >
          <CopyToClipboard text={contract}>
            <TextButton className={classes.tooltip} onClick={handleCopiedOpen}>
              <Copy />

              {t('dashboard.copy')}
            </TextButton>
          </CopyToClipboard>
        </Tooltip>
      }
    >
      {TokenSymbol}
    </Tooltip>
  );

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
