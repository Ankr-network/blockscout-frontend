import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { FormErrors } from 'modules/common/types/FormErrors';
import { ResponseData } from 'modules/common/types/ResponseData';
import { isValidETHAddress } from 'modules/common/utils/isValidETHAddress';
import { t } from 'modules/i18n/utils/intl';
import { PolkadotProvider } from 'polkadot';
import React, { useState } from 'react';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { InputField } from 'uiKit/InputField';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { claimStakingRewards } from '../../actions/claimStakingRewards';
import { connect } from '../../actions/connect';
import { fetchCrowdloanById } from '../../actions/fetchCrowdloanById';
import { IFetchPolkadotAccountsDataItem } from '../../actions/fetchPolkadotAccounts';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { useFetchPolkadotAccounts } from '../../hooks/useFetchPolkadotAccounts';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { IRouteRewardsClaimData, RoutesConfig } from '../../Routes';
import { ProviderName } from '../../utils/isProviderAvailable';
import { WalletSwitcher } from '../WalletSwitcher';
import { useMyRewardsClaimModalStyles } from './useMyRewardsClaimModalStyles';

interface IFormPayload {
  inputWallet?: string;
  isExternalWallet?: boolean;
}

interface IClaimData {
  data?: ResponseData<typeof claimStakingRewards>;
  error?: Error;
  action: any;
}

const IS_FOR_QUICK_RELEASE = true;
const ETH_PROJECT = 'moonbeam';

export const MyRewardsClaimModal = () => {
  const classes = useMyRewardsClaimModalStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const { id, network } = useParams<IRouteRewardsClaimData>();
  const { isConnected, polkadotAccount } = useSlotAuctionSdk();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessWindow, setIsSuccessWindow] = useState(false);
  const [successLink, setSuccessLink] = useState('');

  const loanId: number = Number.parseInt(id, 10);
  const networkKey: string = network.toUpperCase();
  const parachainBondsCrowdloansPath: string =
    RoutesConfig.crowdloans.generatePath(network);

  const goToParachainBondsCrowdloans = (): void =>
    history.push(parachainBondsCrowdloansPath);

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();

    return null;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const { crowdloan, isLoading: isLoadingCrowdloanById } =
    useCrowdloanById(loanId);
  const { isLoading: isLoadingFetchPolkadotAccounts, polkadotAccounts } =
    useFetchPolkadotAccounts();
  /* eslint-enable react-hooks/rules-of-hooks */

  const isETHProject: boolean =
    crowdloan?.rewardTokenName?.toLowerCase() === ETH_PROJECT;

  const providerName: ProviderName | undefined = (
    polkadotAccounts as IFetchPolkadotAccountsDataItem[]
  ).find(
    ({ address }: IFetchPolkadotAccountsDataItem): boolean =>
      address === polkadotAccount,
  )?.providerName;

  if (!polkadotAccounts.length) {
    goToParachainBondsCrowdloans();

    return null;
  }

  const onRenderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<IFormPayload>): React.ReactElement => (
    <>
      <Typography className={classes.titleArea} variant="h3">
        {t(
          'polkadot-slot-auction.my-rewards-claim-modal.select-section.title',
          {
            rewardTokenSymbol: crowdloan?.rewardTokenSymbol ?? '',
            rewardTokenName: crowdloan?.rewardTokenName ?? '',
          },
        )}
      </Typography>

      {isSubmitted ? (
        <QueryLoadingCentered />
      ) : (
        <>
          {!IS_FOR_QUICK_RELEASE && (
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
                  onConnect={onWalletSwitcherItemClick}
                  wallets={polkadotAccounts}
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

                      {isETHProject && (
                        <Tooltip
                          className={classes.inputFieldTooltip}
                          title={t(
                            'polkadot-slot-auction.my-rewards-claim-modal.select-section.tooltip-eth',
                            {
                              rewardTokenName: crowdloan?.rewardTokenName ?? '',
                            },
                          )}
                        >
                          <IconButton>
                            <QuestionIcon size="xs" />
                          </IconButton>
                        </Tooltip>
                      )}
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

          <div className={classes.actionArea}>
            <Button
              className={classes.actionBtn}
              color="primary"
              fullWidth
              onClick={handleSubmit}
              size="large"
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
      ? inputWallet
      : polkadotAccount;
    const rewardTokenName: string = crowdloan?.rewardTokenName
      ? `${crowdloan.rewardTokenName.toLowerCase()}.`
      : '';
    const newSuccessLink: string = `https://${rewardTokenName}subscan.io/account/${targetWallet}`;

    setIsSubmitted(true);

    const claimData: IClaimData = await dispatch(
      claimStakingRewards(targetWallet, loanId),
    );

    if (claimData?.data?.transactionHash) {
      setSuccessLink(newSuccessLink);
      setIsSuccessWindow(true);
    }

    setIsSubmitted(false);
  };

  const onValidate = ({
    inputWallet,
    isExternalWallet,
  }: IFormPayload): FormErrors<IFormPayload> => {
    const errors: FormErrors<IFormPayload> = {};

    if (isExternalWallet) {
      if (typeof inputWallet !== 'string' || inputWallet === ' ') {
        errors.inputWallet = t('validation.required');
      } else if (isETHProject && !isValidETHAddress(inputWallet)) {
        errors.inputWallet = t('validation.invalid-network-address', {
          network: crowdloan?.rewardTokenName ?? t('unit.eth'),
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

  const onWalletSwitcherItemClick =
    (account: string) => async (): Promise<void> => {
      await dispatch(connect(account));
    };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useInitEffect((): void => {
    dispatch(fetchCrowdloanById(loanId));
  });

  if (isLoadingCrowdloanById || isLoadingFetchPolkadotAccounts) {
    return <QueryLoadingCentered />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.containerArea}>
        {!isSubmitted && (
          <div className={classes.closeArea}>
            <IconButton className={classes.closeBtn}>
              <NavLink href={parachainBondsCrowdloansPath}>
                <CancelIcon size="md" />
              </NavLink>
            </IconButton>
          </div>
        )}

        {!isSuccessWindow ? (
          <div className={classes.bodyArea}>
            <Form
              initialValues={{
                isExternalWallet: IS_FOR_QUICK_RELEASE,
              }}
              onSubmit={onSubmit}
              render={onRenderForm}
              validate={onValidate}
            />
          </div>
        ) : (
          <div className={classes.bodyArea}>
            <Typography
              className={classNames(
                classes.titleArea,
                classes.titleSuccessArea,
              )}
              variant="h3"
            >
              {t(
                'polkadot-slot-auction.my-rewards-claim-modal.success-section.title',
                {
                  rewardTokenSymbol: crowdloan?.rewardTokenSymbol ?? '',
                },
              )}
            </Typography>

            <Typography className={classes.messageArea} variant="h5">
              {t(
                'polkadot-slot-auction.my-rewards-claim-modal.success-section.message',
                {
                  rewardTokenName: crowdloan?.rewardTokenName ?? '',
                },
              )}
            </Typography>

            <div className={classes.actionArea}>
              <NavLink
                className={classNames(
                  classes.actionBtn,
                  classes.actionSuccessBtn,
                )}
                color="primary"
                href={successLink}
                size="large"
                variant="contained"
              >
                <ExternalLinkIcon />

                <span className={classes.actionBtnTxt}>
                  {t('polkadot-slot-auction.button.check-wallet')}
                </span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
