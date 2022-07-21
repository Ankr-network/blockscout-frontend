import { Box, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';

import { useClaimFormStyles } from './useClaimFormStyles';

export interface IClaimFormProps {
  balance?: BigNumber;
  isBalanceLoading?: boolean;
  isLoading?: boolean;
  tokenIn?: Token;
  tokenOut?: Token;
  totalAmount?: BigNumber;
  tokenVariantsSlot?: ReactNode;
  closeHref: string;
  onSubmit: () => void;
}

export const ClaimForm = ({
  balance = ZERO,
  isBalanceLoading,
  isLoading,
  tokenIn = Token.ETH,
  tokenOut = Token.aETHb,
  totalAmount = ZERO,
  tokenVariantsSlot,
  closeHref,
  onSubmit,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();

  const isZeroBalance = balance.isZero();

  const isFormDisabled = isZeroBalance || isLoading || isBalanceLoading;

  const renderForm = ({ handleSubmit }: FormRenderProps) => {
    return (
      <Paper
        className={classes.box}
        component="form"
        variant="elevation"
        onSubmit={handleSubmit}
      >
        <Typography className={classes.title} component="h1" variant="h3">
          {t('claim.title')}
        </Typography>

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.token-amount', {
              token: tokenIn,
            })}
          </StakeDescriptionName>

          <StakeDescriptionAmount
            isLoading={isBalanceLoading}
            symbol={tokenIn}
            value={balance.decimalPlaces(DECIMAL_PLACES).toFormat()}
          />
        </StakeDescriptionContainer>

        <StakeDescriptionSeparator />

        {isZeroBalance && !isBalanceLoading && (
          <Box mt={2}>
            <Typography className={classes.error} color="error" variant="body2">
              {t('claim.no-tokens')}
            </Typography>
          </Box>
        )}

        {tokenVariantsSlot}

        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionAmount
            isLoading={isBalanceLoading}
            symbol={tokenOut}
            value={totalAmount.toFormat()}
          />
        </StakeDescriptionContainer>

        <Box mt={5}>
          <Button
            fullWidth
            disabled={isFormDisabled}
            isLoading={isLoading}
            type="submit"
          >
            {t('stake.stake', {
              token: tokenOut,
            })}
          </Button>
        </Box>

        <CloseButton href={closeHref} />
      </Paper>
    );
  };

  return <Form render={renderForm} onSubmit={onSubmit} />;
};
