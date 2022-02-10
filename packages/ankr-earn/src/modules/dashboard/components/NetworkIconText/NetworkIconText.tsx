import { Grid, Typography } from '@material-ui/core';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { TextButton } from 'uiKit/TextButton';
import { Tooltip } from 'uiKit/Tooltip';
import { ReactComponent as Checkmark } from './assets/checkmark.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import { NetworkIconTextSkeleton } from './NetworkIconTextSkeleton';
import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

type TIconMap = Record<
  Token.aBNBb | Token.aMATICb | Token.aETHb | Token.aETHc,
  typeof BNBIcon | typeof AMATICBIcon
>;

const iconByTokenMap: TIconMap = {
  [Token.aBNBb]: BNBIcon,
  [Token.aMATICb]: AMATICBIcon,
  [Token.aETHc]: AETHCIcon,
  [Token.aETHb]: AETHBIcon,
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
}: INetworkIconTextProps) => {
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

  const Token = <Typography className={classes.token}>{token}</Typography>;

  const ContractCopyTooltip = contract && (
    <Tooltip
      interactive
      title={
        <Tooltip
          open={copiedTooltipOpen}
          onClose={handleCopiedClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <div className={classes.copied}>
              <Checkmark />
              {t('dashboard.copied')}
            </div>
          }
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
      {Token}
    </Tooltip>
  );

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Icon className={classes.icon} />
      </Grid>

      <Grid item>
        {ContractCopyTooltip || Token}
        <Typography className={classes.network}>{network}</Typography>
      </Grid>
    </Grid>
  );
};
