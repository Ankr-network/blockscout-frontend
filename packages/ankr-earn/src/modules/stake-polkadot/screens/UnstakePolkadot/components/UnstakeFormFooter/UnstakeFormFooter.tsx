import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { Field, useFormState } from 'react-final-form';

import { DECIMAL_PLACES } from 'modules/common/const';
import {
  EPolkadotNetworks,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { CheckboxField } from 'uiKit/CheckboxField';
import { InputField } from 'uiKit/InputField';

import { useUnstakeFormFooterStyles } from './useUnstakeFormFooterStyles';

enum EFieldNames {
  externalWallet = 'externalWallet',
  isExternalWallet = 'isExternalWallet',
}

export interface IFormPayload extends IUnstakeFormValues {
  externalWallet?: string;
  isExternalWallet?: boolean;
}

interface IUnstakeFormFooterProps {
  amount: BigNumber;
  isDisabled: boolean;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

export const UnstakeFormFooter = ({
  amount,
  isDisabled,
  network,
  polkadotToken,
}: IUnstakeFormFooterProps): JSX.Element => {
  const classes = useUnstakeFormFooterStyles();
  const formState = useFormState<IFormPayload>();

  const isExternalWallet = useMemo(
    () => formState.values[EFieldNames.isExternalWallet],
    [formState.values],
  );

  const networkName = useMemo(
    () => t(`stake-polkadot.networks.${network}`),
    [network],
  );

  return (
    <Box>
      <Box display="flex" mt={2}>
        <Typography
          className={classes.labelTxt}
          color="textPrimary"
          variant="body2"
        >
          {t('stake.you-will-receive')}
        </Typography>

        <Box ml="auto" />

        <Typography
          className={classes.labelTxt}
          color="textPrimary"
          variant="body2"
        >
          {t('unit.token-value', {
            value: amount.isNaN() ? 0 : amount.decimalPlaces(DECIMAL_PLACES),
            token: polkadotToken,
          })}
        </Typography>
      </Box>

      <Box className={classes.checkboxArea}>
        <Field
          component={CheckboxField}
          name={EFieldNames.isExternalWallet}
          type="checkbox"
        >
          <Typography
            className={classes.checkboxTxt}
            color="textSecondary"
            variant="body2"
          >
            {t('stake-polkadot.unstake.send-external-wallet', {
              network: networkName,
            })}
          </Typography>
        </Field>
      </Box>

      {isExternalWallet && (
        <Box className={classes.addressArea}>
          <Typography
            className={classes.labelTxt}
            color="textPrimary"
            variant="body2"
          >
            {t('stake-polkadot.unstake.external-wallet')}
          </Typography>

          <Field
            fullWidth
            className={classes.addressField}
            component={InputField}
            disabled={isDisabled}
            name={EFieldNames.externalWallet}
            type="string"
          />
        </Box>
      )}
    </Box>
  );
};
