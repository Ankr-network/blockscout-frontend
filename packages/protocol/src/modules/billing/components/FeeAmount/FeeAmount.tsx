import { ExternalLink } from '@ankr.com/ui';
import { IconButton, Typography, TypographyOwnProps } from '@mui/material';
import { EBlockchain } from 'multirpc-sdk';

import { CopyButton } from 'uiKit/CopyButton';
import { IFeeDetails } from 'modules/billing/types';
import { renderCryptoFee } from 'modules/billing/utils/renderCryptoFee';
import { renderUSDFee } from 'modules/billing/utils/renderUSDFee';

import { useFeeAmountStyles } from './useFeeAmountStyles';

export interface IFeeAmountProps extends IFeeDetails {
  amountVariant?: TypographyOwnProps['variant'];
  classes?: Partial<ReturnType<typeof useFeeAmountStyles>['classes']>;
  isApproximate?: boolean;
  network: EBlockchain;
}

export const FeeAmount = ({
  amountVariant = 'body2',
  classes: classesOverrides,
  feeCrypto,
  feeUSD,
  isApproximate,
  network,
  txURL,
}: IFeeAmountProps) => {
  const cryptoFee = renderCryptoFee({ fee: feeCrypto, isApproximate, network });
  const usdFee = renderUSDFee({ fee: feeUSD, isApproximate });

  const amount = `${cryptoFee} / ${usdFee}`;

  const { classes } = useFeeAmountStyles(undefined, {
    props: { classes: classesOverrides },
  });

  return (
    <div className={classes.root}>
      <Typography className={classes.amount} variant={amountVariant}>
        {amount}
      </Typography>
      {txURL && (
        <>
          <CopyButton text={txURL} size="extraSmall" />
          <IconButton
            className={classes.txButton}
            href={txURL}
            size="extraSmall"
            target="_blank"
          >
            <ExternalLink className={classes.externalLinkIcon} />
          </IconButton>
        </>
      )}
    </div>
  );
};
