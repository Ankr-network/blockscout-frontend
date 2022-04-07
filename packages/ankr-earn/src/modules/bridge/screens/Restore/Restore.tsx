import { Box, Paper, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { goBack, push } from 'connected-react-router';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';

import { AvailableWriteProviders } from 'provider';
import { Notice } from 'ui';

import { ConnectWalletsModal } from 'modules/auth/components/ConnectWalletsModal';
import { useWalletsGroupTypes } from 'modules/auth/hooks/useWalletsGroupTypes';
import { AuditedLabel } from 'modules/bridge/components/AuditedLabel';
import { BridgeContainer } from 'modules/bridge/components/BridgeContainer';
import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { isValidETHTransaction } from 'modules/common/utils/isValidETHTransaction';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { InputField } from 'uiKit/InputField';

import { fetchTransaction } from '../../actions/fetchTransaction';
import { RoutesConfig } from '../../RoutesConfig';
import { AvailableBridgeTokens } from '../../types';
import { getWithdrawalQuery } from '../../utils/getWithdrawalQuery';

import { useRestoreStyles } from './useRestoreStyles';

interface IRestoreFormData {
  tx: string;
}

const validate = (data: Partial<IRestoreFormData>) => {
  const errors: FormErrors<IRestoreFormData> = {};

  if (!data.tx) {
    errors.tx = t('validation.required');
  } else if (!isValidETHTransaction(data.tx)) {
    errors.tx = t('validation.invalid-transaction');
  }

  return errors;
};

export const Restore = (): JSX.Element => {
  const classes = useRestoreStyles();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();

  const { loading } = useQuery({ type: fetchTransaction.toString() });

  let isConnected = false;

  const { walletsGroupTypes } = useWalletsGroupTypes({
    postProcessingFn: (providerKey, data): void => {
      if (providerKey === AvailableWriteProviders.ethCompatible) {
        isConnected = data.isConnected;
      }
    },
  });

  const handleClose = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const onSubmit = useCallback(
    (formData: IRestoreFormData) => {
      if (loading) {
        return;
      }

      if (!isConnected) {
        onOpenModal();

        return;
      }

      dispatchRequest(fetchTransaction(formData)).then(({ error, data }) => {
        if (!error && data) {
          const query = getWithdrawalQuery(
            {
              tx: formData.tx,
              token: data.token as AvailableBridgeTokens,
              chainIdFrom: data.chainIdFrom,
              chainIdTo: data.chainIdTo,
              amount: data.amount.toString(10),
            },
            document.location.search,
          );

          dispatch(push(`${RoutesConfig.main.generatePath()}?${query}`));
        }
      });
    },
    [dispatch, dispatchRequest, isConnected, loading, onOpenModal],
  );

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<IRestoreFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <Box mb={5}>
            <Typography align="center" variant="h3">
              {t('bridge.restore.title')}
            </Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="h5">
              {t('bridge.restore.label.transaction-id')}
            </Typography>
          </Box>

          <Box mb={2.5}>
            <Field
              classes={{ root: classes.input }}
              component={InputField}
              name="tx"
            />
          </Box>

          <Box mb={6}>
            <Notice>{t('bridge.restore.note')}</Notice>
          </Box>

          <Button fullWidth disabled={loading} size="large" type="submit">
            {isConnected
              ? t('bridge.restore.submit')
              : t('bridge.restore.connect')}
          </Button>
        </form>
      );
    },
    [classes.input, isConnected, loading],
  );

  return (
    <Box component="section" py={{ xs: 5, md: 8 }}>
      <BridgeContainer>
        <Box component={Paper} pb={2} pl={7} position="relative" pr={7} pt={6}>
          <CloseButton onClose={handleClose} />

          <Form
            initialValues={{ tx: '' }}
            render={renderForm}
            validate={validate}
            onSubmit={onSubmit}
          />

          <AuditedLabel />
        </Box>
      </BridgeContainer>

      <ConnectWalletsModal
        isOpen={isOpenedModal}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onCloseModal}
      />
    </Box>
  );
};
