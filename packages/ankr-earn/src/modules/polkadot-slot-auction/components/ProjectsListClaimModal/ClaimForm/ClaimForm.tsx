import { Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { AnyAction } from 'redux';

import { t } from 'common';

import { ResponseData } from 'modules/common/types/ResponseData';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { claimRewardPoolTokens } from '../../../actions/claimRewardPoolTokens';

import { useClaimFormStyles } from './useClaimFormStyles';

type TSetActiveFn = (isActive: boolean) => void;

interface IClaimFormProps {
  bondTokenSymbol: string;
  isLoading?: boolean;
  loanId: number;
  polkadotAccount: string;
  setLoadingFn?: TSetActiveFn;
  setNewWindowFn?: TSetActiveFn;
}

interface IFormPayload {
  isLedgerWallet?: boolean;
}

interface IClaimData {
  data?: ResponseData<typeof claimRewardPoolTokens>;
  error?: Error;
  action: AnyAction;
}

export const ClaimForm = ({
  bondTokenSymbol,
  isLoading,
  loanId,
  polkadotAccount,
  setLoadingFn,
  setNewWindowFn,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();
  const dispatch = useDispatchRequest();

  const onFormRender = ({
    handleSubmit,
  }: FormRenderProps<IFormPayload>): React.ReactElement => (
    <>
      <Typography className={classes.titleArea} variant="h3">
        {t(
          'polkadot-slot-auction.projects-list-claim-modal.claim-section.title',
          {
            bondTokenSymbol,
          },
        )}
      </Typography>

      <div className={classes.actionArea}>
        <Button
          className={classes.actionBtn}
          color="primary"
          disabled={isLoading}
          size="large"
          onClick={handleSubmit}
        >
          <span className={classes.actionBtnTxt}>
            {t('polkadot-slot-auction.button.claim')}
          </span>

          {isLoading && <QueryLoadingAbsolute size={47} />}
        </Button>
      </div>

      {!isLoading && (
        <div className={classes.checkboxArea}>
          <Field
            component={CheckboxField}
            name="isLedgerWallet"
            type="checkbox"
          >
            <Typography className={classes.checkboxTxt} variant="body2">
              {t(
                'polkadot-slot-auction.projects-list-claim-modal.claim-section.ledger-wallet',
                {
                  shortAccount: getShortTxHash(polkadotAccount),
                },
              )}
            </Typography>
          </Field>
        </div>
      )}
    </>
  );

  const onFormSubmit = async ({
    isLedgerWallet,
  }: IFormPayload): Promise<void> => {
    const setLoading: TSetActiveFn =
      typeof setLoadingFn === 'function' ? setLoadingFn : () => {};
    const setNewWindow: TSetActiveFn =
      typeof setNewWindowFn === 'function' ? setNewWindowFn : () => {};

    setLoading(true);

    const claimData: IClaimData = await dispatch(
      claimRewardPoolTokens({
        isLedgerWallet,
        loanId,
        polkadotAccount,
      }),
    );

    if (claimData?.data?.transactionHash) {
      setNewWindow(true);
    }

    setLoading(false);
  };

  return <Form render={onFormRender} onSubmit={onFormSubmit} />;
};
