import { Box, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { t } from 'common';
import { TPolkadotAddress } from 'polkadot';

import { DEFAULT_ROUNDING, featuresConfig } from 'modules/common/const';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import {
  IPolkadotClaimFormPayload,
  TPolkadotETHToken,
} from 'modules/stake-polkadot/types';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useClaimFormStyles } from './useClaimFormStyles';

interface IClaimFormProps {
  amount: BigNumber;
  ethToken: TPolkadotETHToken;
  isLoadingClaim: boolean;
  polkadotAddress?: TPolkadotAddress;
  onFormSubmit: (data: IPolkadotClaimFormPayload) => Promise<void>;
}

export const ClaimForm = ({
  amount,
  ethToken,
  isLoadingClaim,
  polkadotAddress,
  onFormSubmit,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();

  const closeHref = useMemo(() => DashboardRoutes.dashboard.generatePath(), []);

  const renderForm = ({
    handleSubmit,
  }: FormRenderProps<IPolkadotClaimFormPayload>): JSX.Element => (
    <Box>
      <Typography className={classes.titleArea} variant="h2">
        {t('stake-polkadot.claim.title', {
          token: ethToken,
        })}
      </Typography>

      <Box className={classes.infoArea}>
        <Typography
          className={classes.infoTxt}
          color="textPrimary"
          variant="body2"
        >
          {t('stake.you-will-get')}
        </Typography>

        <Typography
          className={classes.infoVal}
          color="textPrimary"
          variant="body2"
        >
          {t('unit.token-value', {
            value: amount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
            token: ethToken,
          })}
        </Typography>
      </Box>

      <Box className={classes.footerArea}>
        <Button
          fullWidth
          color="primary"
          disabled={isLoadingClaim}
          isLoading={isLoadingClaim}
          size="large"
          type="submit"
          onClick={handleSubmit}
        >
          {t('stake-polkadot.claim.claim-btn')}
        </Button>

        {featuresConfig.isActivePolkadotLedgerNanoX &&
          !isLoadingClaim &&
          !!polkadotAddress && (
            <Box className={classes.checkboxArea}>
              <Field
                component={CheckboxField}
                name="isLedgerWallet"
                type="checkbox"
              >
                <Typography className={classes.checkboxTxt} variant="body2">
                  {t('stake-polkadot.claim.ledger-wallet-info', {
                    shortAccount: getShortTxHash(polkadotAddress),
                  })}
                </Typography>
              </Field>
            </Box>
          )}
      </Box>
    </Box>
  );

  return (
    <Paper className={classes.root}>
      {!isLoadingClaim && (
        <NavLink
          className={classes.closeBtn}
          href={closeHref}
          variant="outlined"
        >
          <CloseIcon htmlColor="inherit" size="xxs" />
        </NavLink>
      )}

      <Form render={renderForm} onSubmit={onFormSubmit} />
    </Paper>
  );
};
