import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { DispatchRequest } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { FormErrors } from 'modules/common/types/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import React, { useCallback, useState } from 'react';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { InputField } from 'uiKit/InputField';
import { QueryLoading } from 'uiKit/QueryLoading';
import { depositFundsToCrowdloan } from '../../../../actions/depositFundsToCrowdloan';
import { fetchCrowdloanBalances } from '../../../../actions/fetchCrowdloanBalances';
import { usePolkadotBalance } from '../../../../hooks/usePolkadotBalance';
import { useSlotAuctionSdk } from '../../../../hooks/useSlotAuctionSdk';
import { FormPayload } from '../../SupportProject';
import { InfoLine } from '../InfoLine/InfoLine';
import { useSupportProjectFormStyles } from './useSupportProjectFormStyles';

interface ISupportProjectFormProps {
  crowdloan: ICrowdloanType;
  goToParachainBondsCrowdloans: () => void;
}

const ENABLE_YOU_WILL_GET = false;

export const SupportProjectForm = ({
  crowdloan,
  goToParachainBondsCrowdloans,
}: ISupportProjectFormProps) => {
  const classes = useSupportProjectFormStyles();
  const dispatchRequest: DispatchRequest = useDispatchRequest();

  const [isLoading, setIsLoading] = useState(false);

  const { polkadotAccount } = useSlotAuctionSdk();
  const { balance, minSafeBalance, symbol: currency } = usePolkadotBalance();

  const initialReward = crowdloan.airdropRate.isNaN()
    ? undefined
    : crowdloan.airdropRate.toString(10);

  const dailyReward = crowdloan.rewardRate.isNaN()
    ? undefined
    : crowdloan.rewardRate.toString(10);

  const handleSubmit = async (payload: FormPayload): Promise<void> => {
    setIsLoading(true);

    const { error } = await dispatchRequest(
      depositFundsToCrowdloan(
        polkadotAccount,
        crowdloan.loanId,
        payload.contributeValue,
      ),
    );

    await dispatchRequest(fetchCrowdloanBalances(polkadotAccount));

    setIsLoading(false);

    if (!(error instanceof Error)) {
      goToParachainBondsCrowdloans();
    }
  };

  const onMaxValClick = (onChange: (val: string) => void) => (): void =>
    onChange(balance.toString());

  const validate = useCallback(
    ({ agreement, contributeValue }: FormPayload) => {
      const errors: FormErrors<FormPayload> = {};

      if (!contributeValue) {
        errors.contributeValue = t('validation.required');
      } else {
        const value = Number(contributeValue);

        if (isNaN(value)) {
          errors.contributeValue = t('validation.number-only');
        } else if (value <= 0) {
          errors.contributeValue = t('validation.greater-than-zero');
        } else if (balance.isEqualTo(0)) {
          errors.contributeValue = t('validation.low-balance');
        } else if (balance.isLessThan(value)) {
          errors.contributeValue = t('validation.insufficient-funds');
        }
      }

      if (!agreement) {
        errors.agreement = t('validation.required');
      }

      return errors;
    },
    [balance],
  );

  const validateNumber = useCallback((value: string) => {
    if (!value) return undefined;
    const result = Number(value);
    if (isNaN(result)) {
      return t('validation.number-only');
    }
  }, []);

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<FormPayload>) => (
    <>
      <div className={classes.inputArea}>
        <Typography variant="h5">
          {t('polkadot-slot-auction.support-project-form.want-contribute')}
        </Typography>

        <div className={classes.inputContainer}>
          <Field name="contributeValue" type="number" validate={validateNumber}>
            {(props: FieldRenderProps<string>): React.ReactElement => {
              const { meta, input } = props;

              return (
                <>
                  <div className={classes.inputFieldArea}>
                    <InputField className={classes.inputField} {...props} />

                    <div className={classes.inputFieldLabelArea}>
                      <div className={classes.inputFieldLabel}>{currency}</div>
                    </div>
                  </div>

                  <div className={classes.inputCurrBalanceArea}>
                    <div className={classes.inputCurrBalanceText}>
                      {t(
                        'polkadot-slot-auction.support-project-form.available-balance-txt',
                      )}
                    </div>

                    <div
                      className={classes.inputCurrBalanceVal}
                      onClick={onMaxValClick(input.onChange)}
                    >
                      {t(
                        'polkadot-slot-auction.support-project-form.available-balance-val',
                        {
                          value: balance,
                          currency,
                        },
                      )}
                    </div>

                    <Tooltip
                      className={classes.inputCurrBalanceTooltip}
                      title={t(
                        'polkadot-slot-auction.tooltips.available-balance',
                        {
                          value: minSafeBalance,
                          token: currency,
                          network: t(`stake-polkadot.networks.${currency}`),
                        },
                      )}
                    >
                      <IconButton>
                        <QuestionIcon size="xs" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {(meta.error || meta.submitError) && meta.touched && (
                    <div className={classes.inputErr}>
                      {meta.error || meta.submitError}
                    </div>
                  )}
                </>
              );
            }}
          </Field>
        </div>
      </div>

      {ENABLE_YOU_WILL_GET && (
        <InfoLine
          title={t('polkadot-slot-auction.support-project-form.will-get', {
            bondTokenSymbol: crowdloan.bondTokenSymbol,
          })}
          value={values.contributeValue ?? 0}
        />
      )}
      <InfoLine
        title={t('polkadot-slot-auction.support-project-form.initial-reward', {
          rewardTokenSymbol: crowdloan.rewardTokenSymbol,
        })}
        value={
          initialReward ? initialReward : t('support-project-form.coming-soon')
        }
      />
      <InfoLine
        title={t('polkadot-slot-auction.support-project-form.daily-reward', {
          rewardTokenSymbol: crowdloan.rewardTokenSymbol,
        })}
        value={
          dailyReward ? dailyReward : t('support-project-form.coming-soon')
        }
      />
      <div className={classes.footer}>
        <div className={classes.disclaimerInput}>
          <Field component={CheckboxField} name="agreement" type="checkbox">
            <Typography color="secondary" className={classes.disclaimerText}>
              {t('polkadot-slot-auction.support-project-form.disclaimer', {
                currency,
                project: crowdloan.projectName,
              })}
            </Typography>
          </Field>
        </div>

        <Button
          className={classes.button}
          color="primary"
          disabled={!values.agreement || !values.contributeValue || isLoading}
          onClick={handleSubmit}
          size="large"
          type="submit"
        >
          {t('polkadot-slot-auction.button.contribute-form')}

          {isLoading && <QueryLoading />}
        </Button>
      </div>
    </>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      render={renderForm}
      validate={validate}
      initialValues={{ agreement: false }}
    />
  );
};
