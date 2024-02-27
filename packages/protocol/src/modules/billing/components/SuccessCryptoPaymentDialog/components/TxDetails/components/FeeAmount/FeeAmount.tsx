import { ExternalLink } from '@ankr.com/ui';
import { IconButton, Typography } from '@mui/material';

import { CopyButton } from 'uiKit/CopyButton';
import { ENetwork } from 'modules/billing/types';
import { renderCryptoFee } from 'modules/billing/utils/renderCryptoFee';
import { renderUSDFee } from 'modules/billing/utils/renderUSDFee';

import { useFeeAmountStyles } from './useFeeAmountStyles';

export interface IFeeAmountProps {
  fee: number;
  feeUSD: number;
  network: ENetwork;
  txURL: string;
}

export const FeeAmount = ({ fee, feeUSD, network, txURL }: IFeeAmountProps) => {
  const { classes } = useFeeAmountStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.amount} variant="body2">
        {renderCryptoFee({ fee, network })} / {renderUSDFee(feeUSD)}
      </Typography>
      <CopyButton text={txURL} size="extraSmall" />
      <IconButton
        className={classes.txButton}
        href={txURL}
        size="extraSmall"
        target="_blank"
      >
        <ExternalLink className={classes.externalLinkIcon} />
      </IconButton>
    </div>
  );
};
