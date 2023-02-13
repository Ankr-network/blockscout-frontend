import { t } from '@ankr.com/common';
import { Box, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Form, FormRenderProps } from 'react-final-form';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeTokenInfo } from 'modules/stake/components/StakeTokenInfo/StakeTokenInfo';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';

import { useClaimFormStyles } from './useClaimFormStyles';

const tokenIn = Token.ETH;

export interface IClaimFormProps {
  balance?: BigNumber;
  closeHref: string;
  isBalanceLoading?: boolean;
  isLoading?: boolean;
  nativeAmount: BigNumber;
  totalAmount?: BigNumber;
  onSubmit: () => void;
}

export const ClaimForm = ({
  balance = ZERO,
  closeHref,
  isBalanceLoading,
  isLoading,
  nativeAmount = ZERO,
  totalAmount = ZERO,
  onSubmit,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();

  const isZeroBalance = balance.isZero();

  const isFormDisabled = isZeroBalance || isLoading || isBalanceLoading;

  const tokenOut = t('unit.aethc');

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
            value={balance}
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

        <StakeTokenInfo
          nativeAmount={nativeAmount}
          nativeToken={tokenIn}
          token={tokenOut}
        />

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

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
