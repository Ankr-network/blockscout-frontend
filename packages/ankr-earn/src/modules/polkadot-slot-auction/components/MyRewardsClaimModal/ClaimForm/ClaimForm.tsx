import { Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';
import { AnyAction } from 'redux';

import { t } from 'common';
import { PolkadotProvider } from 'polkadot';

import { featuresConfig } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { ResponseData } from 'modules/common/types/ResponseData';
import { isValidETHAddress } from 'modules/common/utils/isValidETHAddress';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { InputField } from 'uiKit/InputField';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { claimStakingRewards } from '../../../actions/claimStakingRewards';
import { connect } from '../../../actions/connect';
import { IFetchPolkadotAccountsDataItem } from '../../../actions/fetchPolkadotAccounts';
import { TPolkadotAccounts } from '../../../hooks/useFetchPolkadotAccounts';
import { ProviderName } from '../../../utils/isProviderAvailable';
import { WalletSwitcher } from '../../WalletSwitcher';
import { CLOVER_PROJECT, CLOVER_SAFE_START_ADDR_VAL } from '../const';

import { useClaimFormStyles } from './useClaimFormStyles';

type TSetActiveFn = (isActive: boolean) => void;
type TSetSuccessLinkFn = (successLink: string) => void;

interface IClaimFormProps {
  isETHProject: boolean;
  isLoading: boolean;
  isMainnetChainProject: boolean;
  loanId: number;
  network: string;
  polkadotAccount: string;
  polkadotAccounts: TPolkadotAccounts;
  rewardTokenName: string;
  rewardTokenSymbol: string;
  setLoadingFn?: TSetActiveFn;
  setNewWindowFn?: TSetActiveFn;
  setSuccessLinkFn?: TSetSuccessLinkFn;
}

interface IFormPayload {
  inputWallet?: string;
  isExternalWallet?: boolean;
}

interface IClaimData {
  data?: ResponseData<typeof claimStakingRewards>;
  error?: Error;
  action: AnyAction;
}

const isInvalidCloverAddress = (
  rewardTokenName: string,
  inputWallet: string,
): boolean =>
  rewardTokenName === CLOVER_PROJECT &&
  !inputWallet.startsWith(CLOVER_SAFE_START_ADDR_VAL);

const ACALA_PROJECT = 'Acala';

export const ClaimForm = ({
  isETHProject,
  isLoading,
  isMainnetChainProject,
  loanId,
  network,
  polkadotAccount,
  polkadotAccounts,
  rewardTokenName,
  rewardTokenSymbol,
  setLoadingFn,
  setNewWindowFn,
  setSuccessLinkFn,
}: IClaimFormProps): JSX.Element => {
  const classes = useClaimFormStyles();
  const dispatch = useDispatchRequest();

  const networkKey: string = network.toUpperCase();
  const providerName: ProviderName | undefined = useMemo(
    (): ProviderName | undefined =>
      (polkadotAccounts as IFetchPolkadotAccountsDataItem[]).find(
        ({ address }: IFetchPolkadotAccountsDataItem): boolean =>
          address === polkadotAccount,
      )?.providerName,
    [polkadotAccount, polkadotAccounts],
  );

  const onWalletSwitcherItemClick =
    (account: string) => async (): Promise<void> => {
      await dispatch(connect(account));
    };

  const onRender = ({
    handleSubmit,
    values,
  }: FormRenderProps<IFormPayload>): React.ReactElement => (
    <>
      <Typography className={classes.titleArea} variant="h3">
        {t(
          'polkadot-slot-auction.my-rewards-claim-modal.select-section.title',
          {
            rewardTokenSymbol,
            rewardTokenName,
            network: t(
              isMainnetChainProject
                ? 'polkadot-slot-auction.my-rewards-claim-modal.networks.mainnet'
                : 'polkadot-slot-auction.my-rewards-claim-modal.networks.parachain',
            ),
          },
        )}
      </Typography>

      {isLoading ? (
        <QueryLoadingCentered />
      ) : (
        <>
          <Typography className={classes.infoMsgArea} variant="body2">
            {t(
              'polkadot-slot-auction.my-rewards-claim-modal.select-section.info-message',
            )}
          </Typography>

          {featuresConfig.isActiveMyRewardsClaimModalNewParts && (
            <>
              <div className={classes.selectFieldArea}>
                <Typography
                  className={classes.selectFieldLabel}
                  variant="body2"
                >
                  {t(
                    'polkadot-slot-auction.my-rewards-claim-modal.select-section.select-wallet',
                    {
                      network: t(`stake-polkadot.networks.${networkKey}`),
                    },
                  )}
                </Typography>

                <WalletSwitcher
                  classMenu={classes.selectFieldMenu}
                  currentProvider={providerName}
                  currentWallet={polkadotAccount}
                  isDisabled={values?.isExternalWallet}
                  wallets={polkadotAccounts}
                  onConnect={onWalletSwitcherItemClick}
                />
              </div>

              <div className={classes.checkboxArea}>
                <Field
                  component={CheckboxField}
                  name="isExternalWallet"
                  type="checkbox"
                >
                  <Typography className={classes.checkboxTxt} variant="body2">
                    {t(
                      'polkadot-slot-auction.my-rewards-claim-modal.select-section.send-external-wallet',
                    )}
                  </Typography>
                </Field>
              </div>
            </>
          )}

          {values?.isExternalWallet && (
            <div className={classes.inputFieldArea}>
              <Field name="inputWallet" type="string">
                {(props: FieldRenderProps<string>): React.ReactElement => (
                  <>
                    <div className={classes.inputFieldLabelArea}>
                      <Typography
                        className={classes.inputFieldLabel}
                        variant="body2"
                      >
                        {t(
                          'polkadot-slot-auction.my-rewards-claim-modal.select-section.external-wallet',
                        )}
                      </Typography>
                    </div>

                    <InputField
                      className={classes.inputField}
                      {...props}
                      value={props.input.value?.trim()}
                    />
                  </>
                )}
              </Field>
            </div>
          )}

          <Typography className={classes.infoArea} variant="body2">
            <span className={classes.infoSplitter} />

            <span className={classes.infoTxt}>
              {t(
                isETHProject
                  ? 'polkadot-slot-auction.my-rewards-claim-modal.select-section.info-message-eth'
                  : 'polkadot-slot-auction.my-rewards-claim-modal.select-section.info-message-polkadot',
                {
                  rewardTokenName,
                },
              )}
            </span>
          </Typography>

          {rewardTokenName === ACALA_PROJECT && (
            <Typography
              className={classNames(classes.infoArea, classes.infoWarnArea)}
              variant="body2"
            >
              <span
                className={classNames(
                  classes.infoSplitter,
                  classes.infoWarnSplitter,
                )}
              />

              <span
                className={classNames(classes.infoTxt, classes.infoWarnTxt)}
              >
                {t(
                  'polkadot-slot-auction.my-rewards-claim-modal.select-section.info-warn-message',
                  {
                    rewardTokenName,
                  },
                )}
              </span>
            </Typography>
          )}

          <div className={classes.actionArea}>
            <Button
              fullWidth
              className={classes.actionBtn}
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              {t('polkadot-slot-auction.button.continue')}
            </Button>
          </div>
        </>
      )}
    </>
  );

  const onSubmit = async ({
    inputWallet,
    isExternalWallet,
  }: IFormPayload): Promise<void> => {
    const targetWallet: string = isExternalWallet
      ? (inputWallet as string)
      : polkadotAccount;
    const tokenNameSubdomain: string = rewardTokenName.length
      ? `${rewardTokenName.toLowerCase()}.`
      : '';
    const newSuccessLink = `https://${tokenNameSubdomain}subscan.io/account/${targetWallet}`;

    const setLoading: TSetActiveFn =
      typeof setLoadingFn === 'function' ? setLoadingFn : () => {};
    const setNewWindow: TSetActiveFn =
      typeof setNewWindowFn === 'function' ? setNewWindowFn : () => {};
    const setSuccessLink: TSetSuccessLinkFn =
      typeof setSuccessLinkFn === 'function' ? setSuccessLinkFn : () => {};

    setLoading(true);

    const claimData: IClaimData = await dispatch(
      claimStakingRewards(targetWallet, loanId),
    );

    if (claimData?.data?.transactionHash) {
      setSuccessLink(newSuccessLink);
      setNewWindow(true);
    }

    setLoading(false);
  };

  const onValidate = ({
    inputWallet,
    isExternalWallet,
  }: IFormPayload): FormErrors<IFormPayload> => {
    const errors: FormErrors<IFormPayload> = {};

    if (isExternalWallet) {
      if (typeof inputWallet !== 'string' || inputWallet === ' ') {
        errors.inputWallet = t('validation.required');
      } else if (isInvalidCloverAddress(rewardTokenName, inputWallet)) {
        errors.inputWallet = t(
          'polkadot-slot-auction.my-rewards-claim-modal.validation.invalid-clover-address',
          {
            value: CLOVER_SAFE_START_ADDR_VAL,
          },
        );
      } else if (isETHProject && !isValidETHAddress(inputWallet)) {
        errors.inputWallet = t('validation.invalid-network-address', {
          network: rewardTokenName.length ? rewardTokenName : t('unit.eth'),
        });
      } else if (
        !isETHProject &&
        !PolkadotProvider.isValidAddress(inputWallet)
      ) {
        errors.inputWallet = t('validation.invalid-network-address', {
          network: t(`stake-polkadot.networks.${networkKey}`),
        });
      }
    }

    return errors;
  };

  return (
    <Form
      initialValues={{
        isExternalWallet: !featuresConfig.isActiveMyRewardsClaimModalNewParts,
      }}
      render={onRender}
      validate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
